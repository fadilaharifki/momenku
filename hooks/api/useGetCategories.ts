import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { Category } from "@/type/category";

interface GetCategoriesParams {
  keyword?: string;
  page?: number;
  limit?: number | "all";
}

export function useGetCategories(
  params?: GetCategoriesParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<Category[]>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<Category[]>>(
        "/api/categories",
        {
          params: {
            keyword: params?.keyword,
            page: params?.page,
            limit: params?.limit,
          },
        },
      );
      return data;
    },
    ...options,
  });
}
