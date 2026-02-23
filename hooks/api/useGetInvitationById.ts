import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { Invitation } from "@/type/invitation";

export function useGetInvitationById(
  id: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<Invitation>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["invitations", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<Invitation>>(
        `/api/invitations/${id}`,
      );
      return data;
    },
    enabled: !!id,
    ...options,
  });
}
