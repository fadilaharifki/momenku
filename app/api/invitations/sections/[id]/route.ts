import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import { NextRequest } from "next/server";

/**
 * Update Invitation Section (Body/Content)
 * Digunakan oleh VisualLiveEditor
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClientCookies();
    const { id } = await params;

    // Ambil body dari request
    const body = await request.json();
    const { body: htmlBody, is_active, order } = body;

    // 1. Cek Auth: Pastikan user terautentikasi
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return errorResponse("Unauthorized", 401);
    }

    // 2. Update Data
    // Kita biarkan kolom yang tidak dikirim tetap apa adanya
    const updateData: any = {};
    if (htmlBody !== undefined) updateData.body = htmlBody;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (order !== undefined) updateData.order = order;

    const { data, error } = await supabase
      .from("invitation_sections")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // Jika ID tidak ditemukan atau error database lainnya
      console.error("SUPABASE_UPDATE_ERROR:", error);
      return errorResponse(error.message, 400);
    }

    return successResponse(data, "Section updated successfully");
  } catch (err: any) {
    console.error("PATCH_SECTION_ERROR:", err);
    return errorResponse(err.message, 500, err);
  }
}

/**
 * Opsi: DELETE Section jika dibutuhkan
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClientCookies();
    const { id } = await params;

    const { error } = await supabase
      .from("invitation_sections")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return successResponse(null, "Section deleted successfully");
  } catch (err: any) {
    return errorResponse(err.message, 500);
  }
}
