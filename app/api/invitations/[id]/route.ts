import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClientCookies();

    const { id } = await params;

    const { data, error } = await supabase
      .from("invitations")
      .select(
        `
        *,
        theme:themes (*),
        sections:invitation_sections (
          id,
          layout_id,
          title,
          icon,
          body,
          background_url,
          image_url,
          order,
          is_active,
          content
        )
      `,
      )
      .eq("id", id)
      .order("order", { foreignTable: "invitation_sections", ascending: true })
      .single();

    if (error) {
      if (error.code === "PGRST116")
        return errorResponse("Undangan tidak ditemukan", 404);
      throw error;
    }

    return successResponse(data, "Invitation fetched successfully");
  } catch (err: any) {
    return errorResponse(err.message, 500, err);
  }
}
