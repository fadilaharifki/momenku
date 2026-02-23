import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { InvitationSection } from "@/type/invitation";

interface TogglePayload {
  id: string;
  is_active: number;
}

export const useToggleSectionActive = (invitationId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["invitations", invitationId];
  return useMutation({
    mutationFn: async ({ id, is_active }: TogglePayload) => {
      const { data } = await axios.patch(
        `/api/invitations/sections/${id}/active`,
        {
          is_active,
        },
      );
      return data;
    },
    onMutate: async (newSection) => {
      await queryClient.cancelQueries({ queryKey });
      const previousInvitation = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            sections: old.data.sections.map((s: any) =>
              s.id === newSection.id
                ? { ...s, is_active: newSection.is_active }
                : s,
            ),
          },
        };
      });

      return { previousInvitation };
    },

    onError: (err, newSection, context) => {
      if (context?.previousInvitation) {
        queryClient.setQueryData(
          ["invitation", invitationId],
          context.previousInvitation,
        );
      }
      toast.error("Gagal memperbarui status");
    },
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Success memperbarui status section");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["invitation", invitationId] });
    },
  });
};
