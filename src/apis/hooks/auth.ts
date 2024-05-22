import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { TRole } from "../../types/constants";

const createAxios = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 1000,
  withCredentials: true,
});

createAxios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

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
