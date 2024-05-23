import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";
import { TRole } from "../../types/constants";

export type CreateTransactionDTO = {
  message: string;
  content: {
    role: TRole;
  };
};

export const useCreateTransaction = () => {
  return useMutation<CreateTransactionDTO, AxiosError, { transaction: string }>({
    mutationFn: (payload) => {
      return createAxios.post("/transaction", payload);
    },
  });
};
