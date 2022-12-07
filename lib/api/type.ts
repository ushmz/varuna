export type UserInfo = {
  id: number;
  externalId: string;
  token: string;
};

export type TaskQuery = {
  id: number;
  query: string;
};

export type Assignment = {
  taskId: number;
  condition: string;
};

export type ClickLogParam = {
  userId: number;
  taskId: number;
  condition: string;
  pageId: number;
};

export type DwellTimeLogParam = {
  userId: number;
  taskId: number;
  condition: string;
  pageId: number;
};

export type HoverLogParam = {
  userId: number;
  taskId: number;
  condition: string;
  pageId: number;
};

