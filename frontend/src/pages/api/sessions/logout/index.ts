import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const message = "Don't have logged user";
  const reqSession = JSON.parse(req.cookies.session ?? "");
  if (!reqSession || !reqSession?.session)
    return res.status(404).send({ message });

  try {
    const session = await prisma.session.delete({
      where: {
        token: reqSession?.token,
      },
    });

    delete req.cookies.session;
    return !session
      ? res.status(404).send({
          message,
        })
      : res.status(204);
  } catch (error) {
    return res.status(400).send({
      message,
    });
  }
}
