type UserInfo = {
  id: number;
  externalId: string;
  token: string;
};

type TaskQuery = {
  id: number;
  query: string;
};

type Assignment = {
  taskId: number;
  condition: string;
};

type ClickLogParam = {
  userId: number;
  taskId: number;
  condition: string;
  pageId: number;
};

type DwellTimeLogParam = {
  userId: number;
  taskId: number;
  condition: string;
  pageId: number;
};

type HoverLogParam = {
  userId: number;
  taskId: number;
  condition: string;
  pageId: number;
};

