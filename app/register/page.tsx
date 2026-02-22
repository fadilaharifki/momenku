import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Daftar - MomenKu",
  description: "Daftar akun MomenKu dan buat undangan digital premium untuk hari istimewa Anda.",
}

export default function RegisterPage() {
  return <RegisterForm />
}
