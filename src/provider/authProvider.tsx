import { ReactNode, createContext, useReducer } from "react";
import { IPlainObject } from "../types/common";
import { AuthActionEnum, TAuthActionType, TAuthContext, TLogin } from "./types";
import { persistUser, removeUser } from "../utils/persist";
import { EMAIL, META_MASK_ADDRESS, ROLE } from "../constants/common";
import { TRole } from "../types/constants";


const defaultAuthContext: TAuthContext = {
  role: localStorage.getItem(ROLE) as TRole || "guest",
  email: localStorage.getItem(EMAIL) || '',
  metaMaskAddress: localStorage.getItem(META_MASK_ADDRESS) || '',
  login: () => {},
  logout: () => {},
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
    return { ...defaultAuthContext };
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

  return (
    <AuthContext.Provider value={{ ...values, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
