import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";

export type BaseRecordDTO = {
  id?: string;
  date:string;
  amount: number;
  category: string;
  partner: string;
  type: string;
  description: string;
  partnerName?: string;
  categoryName?: string;
  typeName?: string;
};

export type CreateRecordDTO = BaseRecordDTO;
export type UpdateRecordDTO = BaseRecordDTO & { id: string };

export type GetRecordsDTO = {
  message: string;
  content: {
    records: Array<BaseRecordDTO>;
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
      return createAxios.put("/record", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
      queryClient.invalidateQueries({ queryKey: [queryKey.detail] });
    },
  });
};

export const useGetRecords = (): UseQueryResult<GetRecordsDTO, AxiosError> => {
  return useQuery({
    queryKey: [queryKey.list],
    queryFn: () => {
      return createAxios.get("/records");
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
