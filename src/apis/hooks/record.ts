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

export type GetRecordsDTO = {
  message: string;
  content: {
    records: Array<BaseRecordDTO>;
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

export const useGetRecords = (): UseQueryResult<GetRecordsDTO, AxiosError> => {
  return useQuery({
    queryKey: [queryKey.list],
    queryFn: () => {
      return createAxios.get("/records");
    },
  });
};
