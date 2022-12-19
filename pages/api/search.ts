import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { join } from "path";

export type SearchPage = {
  id: number;
  title: string;
  url: string;
  snippet: string;
  icons: string[];
  ratio: {
    total: number;
    distribution: { category: string; count: number }[];
  };
  attributes: {
    name: string;
    value: string;
    exist: boolean;
  }[];
};

export type SerpResponse = {
  data: SearchPage[];
};

export type ErrorResponse = {
  message: string;
};

type TaskType = "english" | "furniture";

const getSearchResult = (task: TaskType, pid: number) => {
  const path = join(process.cwd(), "public/fixtures", `${task}_p${pid}.json`);
  const content = fs.readFileSync(path, "utf8");
  return JSON.parse(content);
};

const searchHandler = (req: NextApiRequest, res: NextApiResponse<SerpResponse | ErrorResponse>) => {
  if (req.method !== "GET") {
    res.status(404).send("");
  }

  const { pid } = req.query;
  if (Array.isArray(pid)) {
    res.status(400).json({ message: "Invalid parameter" });
  }

  res.json({});
};

export default searchHandler;
