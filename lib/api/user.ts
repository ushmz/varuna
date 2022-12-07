import externalAPI from "./instance";

export const simplifiedSignUp = async (externalID: string) => {
  // Avoid converting `externalID` -> `external_i_d` by "humps"
  // be aware that the key name is `externalId`
  const response = await externalAPI.post<{ data: UserInfo }>("/u/signup", { externalId: externalID });
  return response.data.data;
};

export const implicitlySignOut = async (_: string) => {
  return;
};

export const getTaskQueries = async () => {
  const response = await externalAPI.get<TaskQuery[]>("/task/queries");
  return response.data;
};

export const assignTask = async (userID: number, token: string) => {
  // Avoid converting `userID` -> `user_i_d` by "humps"
  // be aware that the key name is `userId`
  const response = await externalAPI.post<{ data: Assignment }>(
    "/a/user/assign",
    { userId: userID },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data.data;
};
