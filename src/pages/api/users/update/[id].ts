import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Schema from "validate";
import { prisma } from "../../../../services/prisma";

export const UserParamsUpdate = new Schema({
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  phone: Number,
  document: {
    type: Number,
    required: false,
  },
  documentType: {
    type: String,
    required: false,
    enum: ["CPF", "CNPJ"],
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let errors;
  if (!!req.body) errors = UserParamsUpdate.validate(req.body);
  if (!!errors.length)
    return res.status(400).send({
      message: errors.map((error) => error.message).join(", "),
    });
  const { id } = req.query;
  if (!id)
    return res.status(400).send({
      message: "ID not recieved",
    });
  const { password, name, phone, document, documentType } = req.body;

  const user: any = {};

  if (!!name) user.name = name;
  if (!!password) user.password = bcrypt.hashSync(password, 10);
  if (!!phone) user.phone = phone;
  if (!!document) user.document = document;
  if (!!documentType) user.documentType = documentType;

  try {
    const nextUser = await prisma.user.update({
      data: user,
      where: {
        id: id.toString(),
      },
    });
    return res.status(200).send(nextUser);
  } catch (error) {
    return res.status(400).send({
      message:
        error?.meta?.message ??
        error?.meta?.cause ??
        "There was an error updating the user.",
    });
  }
}
