import externalAPI from "./instance";
import { ClickLogParam, DwellTimeLogParam, HoverLogParam } from "./type";

export const sendClickLog = async (token: string, param: ClickLogParam) => {
  await externalAPI.post("/log/click", param, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendDwellTimeLog = async (token: string, param: DwellTimeLogParam) => {
  await externalAPI.post("/log/dwell", param, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendHoverLog = async (token: string, param: HoverLogParam) => {
  await externalAPI.post("/log/hover", param, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
