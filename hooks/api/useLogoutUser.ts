"use client";

import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export function useLogoutUser() {
  const logoutStore = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/logout");
      return data;
    },
    onSuccess: (data) => {
      logoutStore();

      queryClient.clear();

      sessionStorage.clear();

      toast.success(data.message || "Berhasil keluar.");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Gagal logout.";
      toast.error(errorMessage);
    },
  });
}
