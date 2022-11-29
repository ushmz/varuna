export const setCondition = (conditionID: string) => {
  localStorage.setItem("condition", conditionID);
};

export const getCondition = () => {
  return localStorage.getItem("condition") || "";
};
