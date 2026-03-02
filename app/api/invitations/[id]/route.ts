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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClientCookies();
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) return errorResponse("ID Undangan tidak ditemukan", 400);

    const updatePayload: any = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("invitations")
      .update(updatePayload)
      .eq("id", id)
      .select(
        `
        *,
        theme:themes (*),
        sections:invitation_sections (*)
      `,
      )
      .single();

    if (error) throw error;

    return successResponse(data, "Undangan & Settings berhasil diperbarui");
  } catch (error: any) {
    console.error("PATCH_INVITATION_ERROR:", error);
    return errorResponse(error.message || "Gagal memperbarui undangan");
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClientCookies();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return errorResponse("Unauthorized", 401);

    const { error: deleteError } = await supabase
      .from("invitations")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) throw deleteError;

    return successResponse(null, "Undangan berhasil dihapus");
  } catch (err: any) {
    return errorResponse(err.message || "Gagal menghapus undangan");
  }
}
