import {
  errorResponse,
  paginateResponse,
  successResponse,
} from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClientCookies();
  const { searchParams } = new URL(req.url);

  const invitation_id = searchParams.get("invitation_id");
  const keyword = searchParams.get("keyword");
  const attendance = searchParams.get("attendance");

  const page = parseInt(searchParams.get("page") || "1");
  const limitParam = searchParams.get("limit") || "10";
  const limit = limitParam === "all" ? 1000 : parseInt(limitParam);

  try {
    let query = supabase
      .from("invitation_rsvps")
      .select("*", { count: "exact" });

    if (invitation_id) {
      query = query.eq("invitation_id", invitation_id);
    }

    if (keyword) {
      query = query.or(`name.ilike.%${keyword}%,rsvp_code.ilike.%${keyword}%`);
    }

    if (attendance !== null && attendance !== "") {
      query = query.eq("attendance", attendance === "true");
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return paginateResponse(
      data,
      page,
      limit,
      count || 0,
      "Daftar tamu berhasil diambil",
    );
  } catch (error: any) {
    return errorResponse(error.message || "Gagal mengambil data tamu");
  }
}

function generateRandomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Tanpa karakter membingungkan
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MOM-${result}`; // Contoh: MOM-K7R2W
}

export async function POST(req: NextRequest) {
  const supabase = await createClientCookies();
  try {
    const body = await req.json();

    const {
      invitation_id,
      name,
      group_name,
      phone,
      attendance,
      guest_count,
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

    const { data, error } = await supabase
      .from("invitation_rsvps")
      .insert([
        {
          invitation_id,
          rsvp_code: rsvp_code,
          name: name,
          group_name: group_name || null,
          phone: phone || null,
          attendance: attendance,
          guest_count: parseInt(guest_count || "0"),
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
