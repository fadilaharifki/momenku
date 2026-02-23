import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClientCookies();
    const { id } = await params;
    const { is_active } = await request.json();

    const { data, error } = await supabase
      .from("invitations")
      .update({ is_active })
      .eq("id", id)
      .select()
      .single();

    if (error) return errorResponse(error.message, 400);

    return successResponse(data, "Status undangan berhasil diubah");
  } catch (err: any) {
    return errorResponse(err.message, 500);
  }
}
