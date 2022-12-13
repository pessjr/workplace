import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id)
    return res.status(400).send({
      message: "ID not recieved",
    });

  try {
    const nextUser = await prisma.user.delete({
      where: {
        id: id.toString(),
      },
    });
    return res.status(204).send(nextUser);
  } catch (error: any) {
    return res.status(400).send({
      message:
        error?.meta?.message ??
        error?.meta?.cause ??
        "There was an error deleting the user.",
    });
  }
}
