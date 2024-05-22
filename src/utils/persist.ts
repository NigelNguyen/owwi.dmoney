import { EMAIL, SESSION_ID, META_MASK_ADDRESS, ROLE } from "../constants/common";
import { TLogin } from "../provider/types";
import { cookie } from "./cookies";

export const persistUser = (data: TLogin) => {
  localStorage.setItem(EMAIL, data.email || "");
  localStorage.setItem(META_MASK_ADDRESS, data.metaMaskAddress || "");
  localStorage.setItem(ROLE, data.role || "");
  cookie.set(SESSION_ID, data.sessionToken);
};

export const removeUser = () => {
  localStorage.removeItem(EMAIL);
  localStorage.removeItem(META_MASK_ADDRESS);
  localStorage.removeItem(ROLE);
  cookie.remove(SESSION_ID);
};
