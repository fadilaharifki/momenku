import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/type/global";
import { RSVP } from "@/type/rsvp";
import { toast } from "sonner";

export function useGetRSVPByCode(
  code?: string,
  options?: Omit<UseQueryOptions<ApiResponse<RSVP>>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["rsvp", code],
    queryFn: async () => {
      try {
        const { data } = await axios.get<ApiResponse<RSVP>>(
          `/api/rsvp/${code?.toUpperCase()}`,
        );
        return data;
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Kode RSVP tidak ditemukan";

        if (code) {
          toast.error(message);
        }

        throw error;
      }
    },
    enabled: !!code,
    retry: false,
    ...options,
  });
}
