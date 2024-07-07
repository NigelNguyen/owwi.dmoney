import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";
import { TRecordFilter } from "../../pages/Records/type";
import { removeUndefinedKeys } from "../../utils/truncateObject";

export type BaseRecordDTO = {
  id?: string;
  date: string;
  amount: number;
  category: string;
  partner: string;
  type: string;
  description?: string;
  partnerName?: string;
  categoryName?: string;
  typeName?: string;
};

export type CreateRecordDTO = BaseRecordDTO;
export type UpdateRecordDTO = BaseRecordDTO & { id: string };
export type DeleteRecordDTO = { id: string };

export type GetRecordsDTO = {
  message: string;
  content: {
    records: Array<BaseRecordDTO>;
  };
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
};

export type GetRecordDTO = {
  message: string;
  content: {
    record: BaseRecordDTO;
  };
};

const queryKey = {
  list: "list-record",
  detail: "detail-record",
};

export const useCreateRecord = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateRecordDTO, AxiosError, CreateRecordDTO>({
    mutationFn: (payload) => {
      return createAxios.post("/record", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
    },
  });
};

export const useUpdateRecord = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateRecordDTO, AxiosError, UpdateRecordDTO>({
    mutationFn: (payload) => {
      return createAxios.post(`/record/${payload.id}/update`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
      queryClient.invalidateQueries({ queryKey: [queryKey.detail] });
    },
  });
};

export const useGetRecords = (
  filter: TRecordFilter & { page: number; pageSize: number }
): UseQueryResult<GetRecordsDTO, AxiosError> => {
  return useQuery({
    queryKey: [queryKey.list, filter],
    queryFn: () => {
      const params = new URLSearchParams(removeUndefinedKeys(filter));
      return createAxios.get(`/records?${params}`);
    },
  });
};

export const useGetRecordById = ({
  id,
}: {
  id: string;
}): UseQueryResult<GetRecordDTO, AxiosError> => {
  return useQuery({
    queryKey: [queryKey.detail, id],
    queryFn: () => {
      return createAxios.get(`/record/${id}`);
    },
    retry: false,
  });
};

export const useDeleteRecordById = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteRecordDTO, AxiosError, DeleteRecordDTO>({
    mutationFn: ({ id }) => {
      return createAxios.post(`/record/${id}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
      queryClient.invalidateQueries({ queryKey: [queryKey.detail] });
    },
  });
};
