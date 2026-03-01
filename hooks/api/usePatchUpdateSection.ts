import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface UpdateSectionPayload {
  body?: string;
  is_active?: number;
  order?: number;
}

export const useUpdateSection = (sectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateSectionPayload) => {
      const { data } = await axios.patch(
        `/api/invitations/sections/${sectionId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      toast.success("Perubahan berhasil disimpan!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal memperbarui data";
      toast.error(message);
      console.error("UPDATE_SECTION_ERROR:", error);
    },
  });
};
