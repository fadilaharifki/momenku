import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { toast } from "sonner";
import { InvitationInterface } from "@/type/invitation";

type InvitationUpdatePayload = Partial<Omit<InvitationInterface, "id">>;

export function useUpdateInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: InvitationUpdatePayload;
    }) => {
      const { data } = await axios.patch<ApiResponse<any>>(
        `/api/invitations/${id}`,
        payload,
      );
      return data;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["invitation", variables.id] });

      queryClient.invalidateQueries({ queryKey: ["invitations"] });

      toast.success(response.message || "Perubahan berhasil disimpan");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Gagal memperbarui undangan";
      toast.error(errorMsg);
      console.error("UPDATE_INVITATION_HOOK_ERROR:", error);
    },
  });
}
