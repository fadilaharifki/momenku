import InvitationPageComponent from "@/components/showing";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ segments?: string[] }>;
}

async function getInvitationData(slug: string) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/invitations/ready/${slug}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return null;
  return res.json();
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
