import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Masuk - MomenKu",
  description: "Masuk ke akun MomenKu Anda untuk mengelola undangan digital premium.",
}

export default function LoginPage() {
  return <LoginForm />
}
