import externalAPI from "./instance";

export type UserInfo = {
  id: number;
  externalID: string;
  token: string;
};

export const simplifiedSignIn = async (externalID: string) => {
  const response = await externalAPI.post<UserInfo>("/signup", { externalID: externalID });
  return response.data;
};

export const implicitlySignOut = async (externalID: string) => {
  return;
};

export type TaskQuery = {
  id: number;
  query: string;
};

export const getTaskQueries = async () => {
  const response = await externalAPI.get<TaskQuery[]>("/task/queries");
  return response.data;
};

export type Assignment = {
  taskID: number;
  condition: string;
};

export const assignTask = async (userID: number) => {
  const response = await externalAPI.post<Assignment>(
    "/a/user/assign",
    { userID: userID },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  return response.data;
};
