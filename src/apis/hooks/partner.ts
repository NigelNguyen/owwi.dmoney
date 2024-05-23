import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";

export type PartnerBaseDTO = {
  id?: string;
  name: string;
  description: string;
};

export type CreatePartnerDTO = PartnerBaseDTO;

export type GetPartnersDTO = {
  message: string;
  content: {
    partners: Array<PartnerBaseDTO>;
  };
};

const queryKey = {
  list: "list-partner",
  detail: "detail-partner",
};

export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation<CreatePartnerDTO, AxiosError, CreatePartnerDTO>({
    mutationFn: (payload) => {
      return createAxios.post("/partner", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
    },
  });
};

export const useGetPartners= (): UseQueryResult<
  GetPartnersDTO,
  AxiosError
> => {
  return useQuery({
    queryKey: [queryKey.list],
    queryFn: () => {
      return createAxios.get("/partners");
    },
  });
};
