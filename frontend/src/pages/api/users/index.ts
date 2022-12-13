import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Schema, { ValidationError } from "validate";
import { prisma } from "../../../services/prisma";

export interface ValidationErrorInterface extends ValidationError {
  message?: String;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = (await prisma.user.findMany({})).map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      document: user.document,
      documentType: user.documentType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    return res.status(201).send(users);
  } catch (error: any) {
    return res.status(400).send({
      message: "There was an error creating the user.",
    });
  }
}
