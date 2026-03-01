import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { InvitationInterface } from "@/type/invitation";

interface CreateInvitationPayload {
  theme_slug: string;
  domain: string;
}

export function useCreateInvitation(
  options?: UseMutationOptions<
    ApiResponse<InvitationInterface>,
    Error,
    CreateInvitationPayload
  >,
) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post<ApiResponse<InvitationInterface>>(
        "/api/invitations",
        payload,
      );
      return data;
    },
    ...options,
  });
}
