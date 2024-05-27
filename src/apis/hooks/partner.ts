import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";

export type PartnerBaseDTO = {
  id?: string;
  name: string;
  description?: string;
};

export type CreatePartnerDTO = PartnerBaseDTO;

export type UpdatePartnerDTO = PartnerBaseDTO & {id: string};

export type GetPartnersDTO = {
  message: string;
  content: {
    partners: Array<PartnerBaseDTO>;
  };
};

export type GetPartnerDTO = {
  message: string;
  content: {
    partner: PartnerBaseDTO;
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

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdatePartnerDTO, AxiosError, UpdatePartnerDTO>({
    mutationFn: (payload) => {
      return createAxios.put("/partner", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
      queryClient.invalidateQueries({ queryKey: [queryKey.detail] });
    },
  });
};


export const useGetPartnerById = ({
  id,
}: {
  id: string;
}): UseQueryResult<GetPartnerDTO, AxiosError> => {
  return useQuery({
    queryKey: [queryKey.detail, id],
    queryFn: () => {
      return createAxios.get(`/partner/${id}`);
    },
    retry: false,
  });
};
