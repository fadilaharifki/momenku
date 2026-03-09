import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";

// Interface untuk payload upload musik
interface UploadMusicPayload {
  file: File;
  invitationId: string;
}

// Interface untuk hasil response
interface UploadMusicResponse {
  url: string;
}

export function useUploadMusic(
  options?: UseMutationOptions<
    ApiResponse<UploadMusicResponse>,
    Error,
    UploadMusicPayload
  >,
) {
  return useMutation({
    mutationFn: async ({ file, invitationId }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("invitationId", invitationId);

      const { data } = await axios.post<ApiResponse<UploadMusicResponse>>(
        "/api/upload-music",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    },
    ...options,
  });
}
