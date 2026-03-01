import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global"; // Asumsi PaginatedResponse ada
import { RSVP } from "@/type/rsvp";

interface GetRSVPsParams {
  invitation_id?: string;
  keyword?: string;
  page?: number;
  limit?: number | "all";
  attendance?: boolean;
}

export function useGetRSVPs(
  params?: GetRSVPsParams,
  options?: Omit<UseQueryOptions<ApiResponse<RSVP[]>>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["rsvps", params],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<RSVP[]>>(`/api/rsvp`, {
        params: {
          invitation_id: params?.invitation_id,
          keyword: params?.keyword,
          page: params?.page,
          limit: params?.limit,
          attendance: params?.attendance,
        },
      });
      return data;
    },
    ...options,
  });
}
