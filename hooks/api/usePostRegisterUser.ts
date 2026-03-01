import { api } from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

interface RegisterPayload {
  email: string;
  password: string;
  phone_number: string;
  full_name: string;
}

type RegisterOptions = UseMutationOptions<any, any, RegisterPayload, any>;

export function useRegisterUser(options?: RegisterOptions) {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post("auth/register", payload);
      return data;
    },
    onSuccess: (data, variables, context) => {
      toast.success("Account Created", {
        description: data.message,
      });

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context, undefined as any);
      }
    },
    onError: (error: any, variables, context) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong during registration.";

      toast.error("Registration Failed", {
        description: errorMessage,
      });

      if (options?.onError) {
        options.onError(error, variables, context, undefined as any);
      }
    },
    ...options,
  });
}
