import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const supabase = await createClientCookies();
  try {
    const { code } = await params;
    const body = await req.json();

    if (!code) return errorResponse("Kode RSVP tidak ditemukan", 400);

    const { data, error } = await supabase
      .from("invitation_rsvps")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("rsvp_code", code.toUpperCase())
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116")
        return errorResponse("Tamu tidak ditemukan", 404);
      throw error;
    }

    return successResponse(data, "Data tamu berhasil diperbarui");
  } catch (error: any) {
    console.error("PATCH_RSVP_BY_CODE_ERROR:", error);
    return errorResponse(error.message || "Gagal memperbarui data tamu");
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const supabase = await createClientCookies();
  try {
    const { code } = await params;

    const { data, error } = await supabase
      .from("invitation_rsvps")
      .select(
        `
        *
      `,
      )
      .eq("rsvp_code", code.toUpperCase())
      .single();

    if (error || !data) {
      return errorResponse("Data tamu tidak ditemukan", 404);
    }

    return successResponse(data, "Data tamu berhasil ditemukan");
  } catch (error: any) {
    console.error("GET_RSVP_BY_CODE_ERROR:", error);
    return errorResponse(error.message || "Gagal mengambil data RSVP");
  }
}
