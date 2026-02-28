import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import { NextRequest } from "next/server";

// Fungsi untuk generate kode random
function generateRandomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Tanpa karakter membingungkan
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MOM-${result}`; // Contoh: MOM-K7R2W
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClientCookies();
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      name,
      group_name,
      phone,
      attendance,
      guest,
      comment,
      ...restOfData
    } = body;

    if (!name || !attendance) {
      return errorResponse("Nama dan Kehadiran wajib diisi", 400);
    }

    // 1. Logika Generate RSVP Code yang Unik
    let rsvp_code = "";
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      // Maksimal 5 kali percobaan
      const tempCode = generateRandomCode();
      const { data: existing } = await supabase
        .from("invitation_rsvps")
        .select("rsvp_code")
        .eq("rsvp_code", tempCode)
        .single();

      if (!existing) {
        rsvp_code = tempCode;
        isUnique = true;
      }
      attempts++;
    }

    if (!rsvp_code)
      throw new Error("Gagal membuat kode unik, silakan coba lagi.");

    // 2. Insert ke Supabase dengan rsvp_code yang sudah digenerate
    const { data, error } = await supabase
      .from("invitation_rsvps")
      .insert([
        {
          invitation_id: id,
          rsvp_code: rsvp_code, // Kode hasil generate BE
          name: name,
          group_name: group_name || null,
          phone: phone || null,
          attendance: attendance,
          guest_count: parseInt(guest || "0"),
          comment: comment || null,
          additional_data: restOfData,
          is_attended: false,
          is_read: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return successResponse(data, "Konfirmasi kehadiran berhasil dikirim!");
  } catch (error: any) {
    console.error("SUPABASE_RSVP_ERROR:", error);
    return errorResponse(error.message || "Gagal menyimpan data ke Supabase");
  }
}
