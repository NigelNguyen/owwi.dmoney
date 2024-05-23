import { TRole } from "../types/constants";

export enum AuthActionEnum {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  UPDATE_MEMBER = "UPDATE_MEMBER",
}

export type TAuthActionType = keyof typeof AuthActionEnum;

export type TLogin = {
  email?: string;
  metaMaskAddress?: string;
  role: TRole;
  sessionToken: string;
};

export type TUpdateMember = {
  role: TRole;
};

export type TAuthContext = {
  role: TRole;
  email?: string;
  metaMaskAddress?: string;
  login?: (data: TLogin) => void;
  logout?: () => void;
  updateMember?: (data: TUpdateMember) => void;
};
