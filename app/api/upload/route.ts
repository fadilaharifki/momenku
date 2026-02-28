import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import sharp from "sharp"; // Import sharp

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const invitationId = formData.get("invitationId") as string;

    if (!file) return errorResponse("No file uploaded", 400);

    // Validasi 5MB (sebelum dikompresi)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return errorResponse("File terlalu besar. Maksimal 5MB.", 400);
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
      return errorResponse("Invitation not found", 404);
    }

    // --- PROSES KONVERSI KE WEBP MENGGUNAKAN SHARP ---
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const webpBuffer = await sharp(inputBuffer)
      .webp({ quality: 80 }) // Ubah ke WebP, kualitas 80% (sweet spot)
      .toBuffer();

    // Nama file sekarang selalu berakhiran .webp
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.webp`;
    const filePath = `${invitation.storage_path}/${fileName}`;

    // 3. Upload ke Supabase Storage (Gunakan webpBuffer)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("image")
      .upload(filePath, webpBuffer, {
        contentType: "image/webp", // Pastikan content type sesuai
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("image").getPublicUrl(filePath);

    return successResponse(
      { url: publicUrl },
      "Image converted to WebP and uploaded",
    );
  } catch (err: any) {
    return errorResponse(err.message, 500);
  }
}
