import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useChangeInvitationStatus = (invitationId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["invitations", invitationId];

  return useMutation({
    mutationFn: async (is_active: number) => {
      const { data } = await axios.patch(
        `/api/invitations/${invitationId}/change-status`,
        {
          is_active,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Status berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal mengubah status");
    },
  });
};
