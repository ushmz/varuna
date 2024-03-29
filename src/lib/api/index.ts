import externalAPI from "./instance";
import {
  Answer,
  Assignment,
  ClickLogParam,
  DwellTimeLogParam,
  HoverLogParam,
  TaskInfo,
  TaskQuery,
  UserInfo,
} from "../../types";

export const simplifiedSignUp = async (externalID: string) => {
  // Avoid converting `externalID` -> `external_i_d` by "humps"
  // be aware that the key name is `externalId`
  const response = await externalAPI.post<{ data: UserInfo }>("/u/signup", { externalId: externalID });
  return response.data.data;
};

export const implicitlySignOut = async () => {
  return;
};

export const getTaskQueries = async () => {
  const response = await externalAPI.get<TaskQuery[]>("/task/queries");
  return response.data;
};

export const assignTask = async (userID: number, token: string, used: { task1: boolean; task2: boolean }) => {
  // Avoid converting `userID` -> `user_i_d` by "humps"
  // be aware that the key name is `userId`
  const response = await externalAPI.post<{ data: Assignment }>(
    "/a/user/assign",
    { userId: userID, used: used },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data.data;
};

export const getTaskInfo = async (taskID: number) => {
  const response = await externalAPI.get<{ data: TaskInfo }>(`/a/task?tid=${taskID}`);
  return response.data.data;
};

export const sendClickLog = async (token: string, param: ClickLogParam) => {
  await externalAPI.post("/a/log/click", param, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendDwellTimeLog = async (token: string, param: DwellTimeLogParam) => {
  await externalAPI.post("/a/log/dwell", param, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendHoverLog = async (token: string, param: HoverLogParam) => {
  await externalAPI.post("/log/hover", param, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCompletionCode = async (userId: number) => {
  const response = await externalAPI.get<{ data: number }>(`/a/user/code?user=${userId}`);
  return response.data.data;
};

export const createAnswer = async (token: string, answer: Answer) => {
  const response = await externalAPI.post(
    "/a/task/answer",
    { answer: answer },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data.data;
};

export const upsertSearchSession = async (token: string, params: { user: number; task: number; condition: string }) => {
  await externalAPI.post("/a/log/session", params, { headers: { Authorization: `Bearer ${token}` } });
};
