export type UserInfo = {
  id: number;
  externalId: string;
  token: string;
};

export type TaskQuery = {
  id: number;
  query: string;
};

export type Condition = "icon" | "ratio" | "purpose" | "controled";

export type Assignment = {
  taskId: number;
  condition: Condition;
};

export type TaskInfo = {
  id: number;
  query: string;
  title: string;
  topic: string;
  description: string;
};

export type ClickLogParam = {
  user: number;
  task: number;
  condition: string;
  rank: number;
  visible: boolean;
  isFirst: boolean;
};

export type DwellTimeLogParam = {
  user: number;
  task: number;
  condition: string;
};

export type HoverLogParam = {
  userId: number;
  taskId: number;
  condition: string;
  pageId: number;
};
