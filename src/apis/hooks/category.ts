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
  description?: string;
};

export type CreateCategoryDTO = CategoryBaseDTO;

export type UpdateCategoryDTO = CategoryBaseDTO & { id: string };

export type GetCategoriesDTO = {
  message: string;
  content: {
    categories: Array<CategoryBaseDTO>;
  };
};

export type GetCategoryDTO = {
  message: string;
  content: {
    category: CategoryBaseDTO;
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

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateCategoryDTO, AxiosError, UpdateCategoryDTO>({
    mutationFn: (payload) => {
      return createAxios.put("/category", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.list] });
      queryClient.invalidateQueries({ queryKey: [queryKey.detail] });
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

export const useGetCategoryById = ({
  id,
}: {
  id: string;
}): UseQueryResult<GetCategoryDTO, AxiosError> => {
  return useQuery({
    queryKey: [queryKey.detail],
    queryFn: () => {
      return createAxios.get(`/category/${id}`);
    },
  });
};
