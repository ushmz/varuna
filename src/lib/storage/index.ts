import { Assignment, UserInfo } from "../../types";

export const getUserID = () => {
  return localStorage.getItem("id") || "";
};

const setCondition = (conditionID: string) => {
  localStorage.setItem("condition", conditionID);
};

export const getCondition = () => {
  return localStorage.getItem("condition") || "";
};

const setAssignedTask = (taskID: number) => {
  localStorage.setItem("task", taskID.toString());
};

export const getAssignedTask = () => {
  return localStorage.getItem("task") || "";
};

export const setAssignment = (assignment: Assignment) => {
  setCondition(assignment.condition);
  setAssignedTask(assignment.taskId);
};

export const setUserInfo = (user: UserInfo) => {
  localStorage.setItem("id", user.id.toString());
  localStorage.setItem("externalID", user.externalId);
  localStorage.setItem("token", user.token);
};
