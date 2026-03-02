import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { toast } from "sonner";

export function useDeleteInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete<ApiResponse<any>>(
        `/api/invitations/${id}`,
      );
      return data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });

      toast.success(response.message || "Undangan berhasil dihapus");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Gagal menghapus undangan";
      toast.error(errorMsg);
      console.error("DELETE_INVITATION_HOOK_ERROR:", error);
    },
  });
}
