import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { Invitation } from "@/type/invitation";

interface GetInvitationsParams {
  keyword?: string;
  page?: number;
  limit?: number | "all";
}

export function useGetInvitations(
  params?: GetInvitationsParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<Invitation[]>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["invitations", params],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<Invitation[]>>(
        "/api/invitations",
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
