import next, { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "validate";
import { prisma } from "../../../services/prisma";

export interface ValidationErrorInterface extends ValidationError {
  message?: String;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: `${id}`,
      },
    });
    const nextUser = { ...user };
    delete nextUser.password;
    return nextUser
      ? res.status(200).send(nextUser)
      : res.status(404).send({ message: "User not found." });
  } catch (error: any) {
    return res.status(400).send({
      message: "There was an error creating the user.",
    });
  }
}
