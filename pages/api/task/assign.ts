import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function taskAssignHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(404).json({ msg: "Not Found" });
    return;
  }

  const assign = prisma.$transaction(async (tx) => {
    const g = await tx.group.findFirst({ where: {}, orderBy: { counts: "asc" } });
    if (!g) {
      res.status(500).json({ msg: "Failed to get task information" });
      return;
    }

    await tx.group.update({
      where: {
        conditionID_taskID: {
          conditionID: g.conditionID,
          taskID: g.taskID,
        },
      },
      data: {
        ...g,
        counts: g.counts + 1,
      },
    });

    return {
      condition: g.conditionID,
      task: g.taskID,
    };
  });

  await assign
    .then((task) => {
      if (!task) {
        res.status(500).json({ msg: "Transaction ended with empty result" });
        return;
      }
      res.json(task);
      return;
    })
    .catch((_) => {
      res.status(500).json({ msg: "Something went wrong in transaction" });
      return;
    });
}
