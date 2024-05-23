import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { TRole } from "../../types/constants";
import createAxios from "../axios";

export type UserDTO = {
  email?: string;
  password?: string;
  metaMaskAddress?: string;
};

export type LoginResponseDTO = {
  message: string;
  content: {
    email: string;
    metaMaskAddress: string;
    isConfirmedEmail: string;
    role: TRole;
    sessionToken: string;
  };
};

export const useRegister = () => {
  return useMutation<AxiosResponse, AxiosError, UserDTO>({
    mutationFn: (payload) => {
      return createAxios.post("/register", payload);
    },
  });
};

export const useLogin = () => {
  return useMutation<LoginResponseDTO, AxiosError, UserDTO>({
    mutationFn: (payload) => {
      return createAxios.post("/login", payload);
    },
  });
};
