import InvitationPageComponent from "@/components/showing";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ segments?: string[] }>;
}

async function getInvitationData(slug: string) {
  // Pastikan URL-nya tidak undefined/kosong
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/invitations/ready/${slug}`, {
      next: { revalidate: 60 },
    });

    // Cek Content-Type header sebelum parsing
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.error(
        `API Error for slug ${slug}: Received non-JSON or error status`,
      );
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("FETCH_INVITATION_ERROR:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { segments } = await params;
  const slug = segments?.[0];

  if (!slug) return { title: "Momenku" };

  const response = await getInvitationData(slug);
  const invitation = response?.data;

  if (!invitation) return { title: "Undangan Tidak Ditemukan - Momenku" };

  return {
    title: invitation.title,
    description: invitation.description,
    openGraph: {
      images: [invitation.thumbnail_url || ""],
    },
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { segments } = await params;

  const slug = segments?.[0];
  const rsvpCode = segments?.[1];

  if (!slug) return notFound();

  const response = await getInvitationData(slug);

  if (!response || !response.data) {
    return notFound();
  }

  return (
    <InvitationPageComponent
      slug={slug}
      rsvpCode={rsvpCode}
      invitation={response.data}
    />
  );
}
