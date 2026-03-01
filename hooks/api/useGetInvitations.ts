import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { InvitationInterface } from "@/type/invitation";

interface GetInvitationsParams {
  keyword?: string;
  page?: number;
  limit?: number | "all";
}

export function useGetInvitations(
  params?: GetInvitationsParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<InvitationInterface[]>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["invitations", params],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<InvitationInterface[]>>(
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
