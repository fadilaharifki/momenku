import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const supabase = await createClientCookies();

    const { slug } = await params;

    if (!slug) return errorResponse("Slug tidak valid", 400);

    const { data, error } = await supabase
      .from("invitations")
      .select(
        `
        *,
        themes (*),
        sections:invitation_sections (*)
      `,
      )
      .eq("domain", slug)
      .single();

    if (error || !data) {
      return errorResponse("Undangan tidak ditemukan", 404);
    }

    const invitation = data as any;
    if (invitation.sections) {
      invitation.sections.sort((a: any, b: any) => a.order - b.order);
    }

    return successResponse(invitation, "Data undangan berhasil dimuat");
  } catch (err: any) {
    return errorResponse(err.message, 500, err);
  }
}
