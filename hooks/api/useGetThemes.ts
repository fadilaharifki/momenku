import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { Theme } from "@/type/theme";

interface GetThemesParams {
  keyword?: string;
  category_id?: string;
  page?: number;
  limit?: number | "all";
  isActive?: boolean;
}

export function useGetThemes(
  params?: GetThemesParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<Array<Theme>>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["themes", params],
    queryFn: async () => {
      const { data } = await axios.get("/api/themes", {
        params: {
          keyword: params?.keyword,
          category_id: params?.category_id,
          page: params?.page,
          limit: params?.limit,
          isActive: params?.isActive,
        },
      });
      return data;
    },
    ...options,
  });
}
