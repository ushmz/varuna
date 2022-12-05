import { NextApiRequest, NextApiResponse } from "next";

export default async function getTaskQueries(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(404).send("");
    return;
  }
  res.json({ queries: ["オンライン英会話", "家具レンタル"] });
}
