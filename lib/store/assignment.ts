import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const assignmentState = atom({
  key: "task",
  default: {
    taskId: null,
    condition: "",
  },
  effects_UNSTABLE: [persistAtom],
});
