import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";

export type TypeBaseDTO = {
  id?: string;
  name: string;
  description: string;
};

export type GetTypesDTO = {
  message: string;
  content: {
    types: Array<TypeBaseDTO>;
  };
};

export const useGetTypes = (): UseQueryResult<GetTypesDTO, AxiosError> => {
  return useQuery({
    queryKey: [],
    queryFn: () => {
      return createAxios.get("/types");
    },
  });
};
