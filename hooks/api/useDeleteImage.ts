import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";

interface DeleteImagePayload {
  fileName: string;
  invitationId: string;
}

export function useDeleteImage(
  options?: UseMutationOptions<ApiResponse<any>, Error, DeleteImagePayload>,
) {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post<ApiResponse<any>>(
        "/api/upload/delete",
        payload,
      );
      return data;
    },
    ...options,
  });
}
