import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InvitationPageComponent from "@/components/showing";

// 2. Fungsi Fetch Data dari API (Internal atau Direct DB)
async function getThemeData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/themes/${slug}`, {
    next: { revalidate: 1 },
  });

  if (!res.ok) return null;
  const response = await res.json();
  return response.data; // Mengasumsikan helper successResponse kamu
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const theme = await getThemeData(slug);

  if (!theme) return { title: "Template Tidak Ditemukan" };

  return {
    title: `${theme.name} - Template Undangan | Momenku`,
    description: theme.description,
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 3. Ambil data tema dari API
  const theme = await getThemeData(slug);

  if (!theme) notFound();

  return <InvitationPageComponent slug={slug} invitation={theme} />;
}
