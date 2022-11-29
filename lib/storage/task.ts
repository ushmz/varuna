export const setAssignedTasks = (taskID: number) => {
  localStorage.setItem("task", taskID.toString());
};

export const getAssignedTasks = () => {
  const task = localStorage.getItem("task");
  if (!task) {
    return 0;
  }

  return parseInt(task);
};
