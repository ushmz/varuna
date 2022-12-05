import { NextApiRequest, NextApiResponse } from "next";

const getTaskByID = (id: string) => {
  return {
    taskID: id,
    title: "title",
  };
};

export default function taskHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(404).send("");
  }

  const { tid } = req.query;

  let task = {};
  switch (typeof tid) {
    case "string":
      task = getTaskByID(tid);
      res.json(task);
      break;
    case "object":
      task = getTaskByID(tid[0]);
      res.json(task);
      break;
    default:
      res.status(400).send("");
      break;
  }
}
