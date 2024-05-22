import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
const createAxios = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 1000,
});

export type UserDTO = {
  email?: string;
  password?: string;
  metaMaskAddress?: string;
};

export const useRegister = () => {
  return useMutation<AxiosResponse, AxiosError, UserDTO>({
    mutationFn: (payload) => {
      return createAxios.post("/register", payload);
    },
  });
};

export const useLogin = () => {
  return useMutation<AxiosResponse, AxiosError, UserDTO>({
    mutationFn: (payload) => {
      return createAxios.post("/login", payload);
    },
  });
};
