import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";

interface GetLayoutsParams {
  category?: string;
  keyword?: string; // Tambah ini
  page?: number;
  limit?: number | "all";
}

export function useGetLayouts(
  params?: GetLayoutsParams,
  options?: Omit<UseQueryOptions<ApiResponse<any>>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["layouts", params],
    queryFn: async () => {
      const { data } = await axios.get("/api/layouts", {
        params: {
          category: params?.category,
          keyword: params?.keyword, // Kirim ke API
          page: params?.page,
          limit: params?.limit,
        },
      });
      return data;
    },
    ...options,
  });
}
