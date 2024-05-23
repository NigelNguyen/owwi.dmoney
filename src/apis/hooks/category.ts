import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import createAxios from "../axios";

export type CategoryBaseDTO = {
  id?: string;
  name: string;
  description: string;
};

export type CreateCategoryDTO = CategoryBaseDTO;

export type GetCategoriesDTO = {
  message: string;
  content: {
    categories: Array<CategoryBaseDTO>;
  };
};

const queryKey = {
  list: "list-category",
  detail: "detail-category",
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateCategoryDTO, AxiosError, CreateCategoryDTO>({
    mutationFn: (payload) => {
      return createAxios.post("/category", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
    },
  });
};

export const useGetCategories = (): UseQueryResult<
  GetCategoriesDTO,
  AxiosError
> => {
  return useQuery({
    queryKey: [queryKey.list],
    queryFn: () => {
      return createAxios.get("/categories");
    },
  });
};
