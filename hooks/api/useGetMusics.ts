import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { MusicInterface } from "@/type/music";

export function useGetMusics(params?: { keyword?: string; limit?: number }) {
  return useInfiniteQuery({
    queryKey: ["musics", params],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<ApiResponse<MusicInterface[]>>(
        "/api/musics",
        {
          params: {
            keyword: params?.keyword,
            page: pageParam,
            limit: params?.limit || 10,
          },
        },
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((p) => p.data).length;
      const totalCount = lastPage.pagination?.total_items || 0;
      return totalLoaded < totalCount ? allPages.length + 1 : undefined;
    },
  });
}
