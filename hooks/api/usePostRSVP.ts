import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";

interface CreateRSVPPayload {
  invitation_id: string;
  name: string;
  group_name?: string;
  phone?: string;
  attendance: string;
  guest?: string;
  comment?: string;
  [key: string]: any;
}

export function usePostRSVP(
  invitationId: string,
  options?: UseMutationOptions<ApiResponse<any>, Error, CreateRSVPPayload>,
) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post<ApiResponse<any>>(`/api/rsvp`, {
        ...payload,
        invitation_id: invitationId,
      });
      return data;
    },
    ...options,
  });
}
