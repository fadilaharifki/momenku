import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { Invitation } from "@/type/invitation";

interface CreateInvitationPayload {
  theme_slug: string;
  domain: string;
}

export function useCreateInvitation(
  options?: UseMutationOptions<
    ApiResponse<Invitation>,
    Error,
    CreateInvitationPayload
  >,
) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post<ApiResponse<Invitation>>(
        "/api/invitations",
        payload,
      );
      return data;
    },
    ...options,
  });
}
