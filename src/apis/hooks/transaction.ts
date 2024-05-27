import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";
import { TRole } from "../../types/constants";
import { TErrorResponse } from "../../types/common";

export type CreateTransactionDTO = {
  message: string;
  content: {
    role: TRole;
  };
};

export const useCreateTransaction = () => {
  return useMutation<
    CreateTransactionDTO,
    AxiosError<TErrorResponse>,
    { transaction: string; metaMaskAddress: string }
  >({
    mutationFn: (payload) => {
      return createAxios.post("/transaction", payload);
    },
  });
};
