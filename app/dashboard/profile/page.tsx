import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileComponent from "@/components/profile";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/me`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  const res = await response.json();

  if (!res.success) {
    redirect("/login");
  }

  const user = res.data.user;

  return <ProfileComponent initialData={user} />;
}
