import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import moment from "moment";
import { prisma } from "../../../../services/prisma";

export type UserType = {
  id: string;
  email: string;
  name: string;
  phone?: number;
  document?: number;
  documentType?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type LoginResponse = {
  token: string;
  expires: Date;
  user: UserType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = JSON.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ message: "Password invalid" });

  try {
    const now = new Date().getTime();

    const nextSession = await prisma.session.create({
      data: {
        token: bcrypt.genSaltSync(10),
        expires: moment(new Date(now)).add(2, "hours").toISOString(),
        userId: user.id,
      },
    });
    return res.status(200).send({
      ...nextSession,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: Number(user.phone),
        document: user.document ?? undefined,
        documentType: user.documentType ?? undefined,
      },
    });
  } catch (error) {
    return res.status(400).send({
      message: "Do not login",
    });
  }
}
