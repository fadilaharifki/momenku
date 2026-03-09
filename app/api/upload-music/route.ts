import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const invitationId = formData.get("invitationId") as string;

    if (!file) return errorResponse("No file uploaded", 400);

    if (!file.type.startsWith("audio/")) {
      return errorResponse("File harus berupa audio (MP3/WAV/M4A)", 400);
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return errorResponse("File musik terlalu besar. Maksimal 5MB.", 400);
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

    if (dbError || !invitation) {
      return errorResponse("Invitation not found or access denied", 404);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExt = file.name.split(".").pop();
    const fileName = `music-${Date.now()}.${fileExt}`;

    const filePath = `${invitation.storage_path}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("music")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("music").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("invitations")
      .update({
        music_url: publicUrl,
        music_status: true,
      })
      .eq("id", invitationId);

    if (updateError) throw updateError;

    return successResponse(
      { url: publicUrl },
      "Musik berhasil diunggah dan diterapkan",
    );
  } catch (err: any) {
    return errorResponse(err.message, 500);
  }
}
