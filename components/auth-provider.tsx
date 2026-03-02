"use client";

import { useSyncUser } from "@/hooks/api/useSyncUser";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useSyncUser();

  return <>{children}</>;
}
