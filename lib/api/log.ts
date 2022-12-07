import { userState } from "@lib/store/user";
import { useRecoilValue } from "recoil";
import externalAPI from "./instance";
import { ClickLogParam, DwellTimeLogParam, HoverLogParam, UserInfo } from "./type";

export const sendClickLog = async (param: ClickLogParam) => {
  const userInfo = useRecoilValue<UserInfo>(userState);
  await externalAPI.post("/log/click", param, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });
};

export const sendDwellTimeLog = async (param: DwellTimeLogParam) => {
  const userInfo = useRecoilValue<UserInfo>(userState);
  await externalAPI.post("/log/dwell", param, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });
};

export const sendHoverLog = async (param: HoverLogParam) => {
  const userInfo = useRecoilValue<UserInfo>(userState);
  await externalAPI.post("/log/hover", param, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });
};
