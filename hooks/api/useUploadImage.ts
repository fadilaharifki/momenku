import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";

// Interface untuk payload upload
interface UploadImagePayload {
  file: File;
  invitationId: string;
}

// Interface untuk hasil response (sesuai dengan successResponse API kita)
interface UploadImageResponse {
  url: string;
}

export function useUploadImage(
  options?: UseMutationOptions<
    ApiResponse<UploadImageResponse>,
    Error,
    UploadImagePayload
  >,
) {
  return useMutation({
    mutationFn: async ({ file, invitationId }) => {
      // Kita gunakan FormData karena mengirimkan File (multipart/form-data)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("invitationId", invitationId);

      const { data } = await axios.post<ApiResponse<UploadImageResponse>>(
        "/api/upload",
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
