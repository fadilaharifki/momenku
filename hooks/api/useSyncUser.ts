"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import { useAuthStore } from "@/stores/auth-store";

export function useSyncUser() {
  const setUser = useAuthStore((state) => state.setUser);

  const hasToken = !!getCookie("auth-token.0") || !!getCookie("auth-token");

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await api.get("auth/me");
      return data;
    },
    // Query hanya jalan jika ada token di cookie
    enabled: hasToken,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 menit
  });

  useEffect(() => {
    // 1. Jika data berhasil diambil
    if (query.data?.success && query.data?.data?.user) {
      setUser(query.data.data.user);
    }

    // 2. Jika terjadi error API
    else if (query.isError) {
      setUser(null);
      const status = (query.error as any)?.response?.status;
      const errorData = (query.error as any)?.response?.data;

      // Hanya munculkan toast jika error bukan karena belum login (401)
      if (status !== 401) {
        toast.error("Session Sync Failed", {
          description:
            errorData?.message || "Failed to synchronize your profile.",
        });
      }
    }

    // 3. Jika query tidak jalan (karena tidak ada token)
    else if (!hasToken) {
      setUser(null);
    }
  }, [query.data, query.isError, query.error, hasToken, setUser]);

  return query;
}
