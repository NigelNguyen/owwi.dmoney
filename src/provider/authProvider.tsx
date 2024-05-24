import { ReactNode, createContext, useReducer } from "react";
import { IPlainObject } from "../types/common";
import {
  AuthActionEnum,
  TAuthActionType,
  TAuthContext,
  TLogin,
  TUpdateMember,
} from "./types";
import { persistRole, persistUser, removeUser } from "../utils/persist";
import { EMAIL, META_MASK_ADDRESS, ROLE } from "../constants/common";
import { TRole } from "../types/constants";

const defaultAuthContext: TAuthContext = {
  role: (localStorage.getItem(ROLE) as TRole) || "guest",
  email: localStorage.getItem(EMAIL) || "",
  metaMaskAddress: localStorage.getItem(META_MASK_ADDRESS) || "",
  login: () => {},
  logout: () => {},
  updateMember: () => {},
};

export const AuthContext = createContext(defaultAuthContext);

const reducerAuth = (
  state: TAuthContext,
  action: { type: TAuthActionType; payload?: IPlainObject }
) => {
  if (action.type === "LOGIN") {
    const data = action.payload as TLogin;
    persistUser(data);

    return {
      ...state,
      role: data.role,
      email: data.email,
      metaMaskAddress: data.metaMaskAddress,
    };
  }

  if (action.type === "LOGOUT") {
    removeUser();
    return { role: "guest", email: "", metaMaskAddress: "" } as TAuthContext;
  }

  if (action.type === "UPDATE_MEMBER") {
    const data = action.payload as TUpdateMember;
    persistRole(data.role);
    return { ...state, role: data.role };
  }

  return { ...state };
};
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [values, dispatch] = useReducer(reducerAuth, defaultAuthContext);
  const login = (data: TLogin) => {
    dispatch({
      type: AuthActionEnum.LOGIN,
      payload: data,
    });
  };

  const logout = () => {
    dispatch({
      type: AuthActionEnum.LOGOUT,
    });
  };

  const updateMember = (data: TUpdateMember) => {
    dispatch({
      type: AuthActionEnum.UPDATE_MEMBER,
      payload: data,
    });
  };

  return (
    <AuthContext.Provider value={{ ...values, login, logout, updateMember }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
