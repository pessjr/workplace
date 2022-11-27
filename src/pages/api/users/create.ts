import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Schema, { ValidationError } from "validate";
import { prisma } from "../../../services/prisma";

export interface ValidationErrorInterface extends ValidationError {
  message?: String;
}

export const UserParams = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
  let errors: ValidationErrorInterface[] = [];
  const body = JSON.parse(req.body);
  if (!!body) errors = UserParams.validate(body);
  if (!!errors?.length)
    return res.status(400).send({
      message: errors.map((error) => error?.message).join(", "),
    });

  const { email, password, name, phone, document, documentType } = body;

  const nextPassword = bcrypt.hashSync(password, 10);
  const user: any = {
    email,
    name,
    password: nextPassword,
  };

  if (!!phone) user.phone = phone;
  if (!!document) user.document = document;
  if (!!documentType) user.documentType = documentType;

  const now = new Date().toISOString();
  user.createdAt = now;
  user.updatedAt = now;

  try {
    const nextUser = await prisma.user.create({
      data: user,
    });
    return res.status(201).send(nextUser);
  } catch (error: any) {
    let message = "There was an error creating the user.";
    if (error?.meta?.target === "OneMoreUser_email_unique_constraint")
      message = "Email already exists.";
    if (error?.meta?.target === "OneMoreUser_document_unique_constraint")
      message = "Document already exists";
    return res.status(400).send({
      message,
    });
  }
}
