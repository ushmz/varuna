import { NextApiRequest, NextApiResponse } from "next";

const listTasks = () => {};

export default function taskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(404).send("");
  }

  listTasks();
  res.json({ tasks: [] });
}
