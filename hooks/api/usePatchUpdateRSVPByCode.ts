import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { RSVP } from "@/type/rsvp";
import { toast } from "sonner";

export function useUpdateRSVPByCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      code,
      payload,
    }: {
      code: string;
      payload: Partial<RSVP>;
    }) => {
      const { data } = await axios.patch<ApiResponse<RSVP>>(
        `/api/rsvp/${code.toUpperCase()}`,
        payload,
      );
      return data;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      queryClient.invalidateQueries({
        queryKey: ["rsvp", variables.code.toUpperCase()],
      });

      toast.success(response.message || "Data berhasil disimpan!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal update data");
    },
  });
}
