import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { fileName, invitationId } = await request.json();

    if (!fileName && !invitationId) {
      return errorResponse("Missing fileName or invitationId", 400);
    }

    const supabase = await createClientCookies();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const { data: invitation, error: dbError } = await supabase
      .from("invitations")
      .select("storage_path")
      .eq("id", invitationId)
      .eq("user_id", user.id)
      .single();

    if (dbError || !invitation?.storage_path) {
      return errorResponse("Unauthorized or Invitation not found", 403);
    }

    const filePath = `${invitation.storage_path}/${fileName}`;

    const { data, error: deleteError } = await supabase.storage
      .from("image")
      .remove([filePath]);

    if (deleteError) throw deleteError;

    return successResponse(data, "File deleted successfully");
  } catch (err: any) {
    return errorResponse(err.message, 500);
  }
}
