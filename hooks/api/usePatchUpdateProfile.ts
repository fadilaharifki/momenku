import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

interface ProfileUpdatePayload {
  full_name?: string;
  phone_number?: string;
  avatar_url?: string;
}

export function usePatchUpdateProfile() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: ProfileUpdatePayload) => {
      const { data } = await axios.patch<ApiResponse<any>>(
        `/api/profile`,
        payload,
      );
      return data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      if (response.data?.user) {
        setUser(response.data.user);
      }

      toast.success(response.message || "Profil berhasil diperbarui");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Gagal memperbarui profil";
      toast.error(errorMsg);
      console.error("UPDATE_PROFILE_HOOK_ERROR:", error);
    },
  });
}
