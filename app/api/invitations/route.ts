import { createClientCookies } from "@/lib/supabase-server";
import {
  successResponse,
  errorResponse,
  paginateResponse,
} from "@/lib/api-response";
import { NextRequest } from "next/server";
import { DEFAULT_INVITATION_SETTINGS } from "@/lib/constants/invitation-defaults";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClientCookies();
    const body = await request.json();
    const { theme_slug, domain } = body;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const { data: theme, error: themeError } = await supabase
      .from("themes")
      .select("id, background_url, music_url")
      .eq("slug", theme_slug)
      .single();

    if (themeError || !theme) return errorResponse("Tema tidak ditemukan", 404);

    const storagePath = `client/${domain}`;
    console.log(theme, "theme");

    const { data, error } = await supabase
      .rpc("create_invitation_with_sections", {
        p_user_id: user.id,
        p_theme_id: theme.id,
        p_domain: domain,
        p_settings: DEFAULT_INVITATION_SETTINGS,
        p_background_url: theme.background_url,
        p_music_url: theme.music_url,
        p_storage_path: storagePath,
      })
      .single();

    if (error) {
      if (error.code === "23505") {
        return errorResponse(
          "Link undangan sudah digunakan, coba nama lain.",
          400,
        );
      }
      throw error;
    }

    return successResponse(
      data,
      "Invitation created successfully with all sections",
    );
  } catch (err: any) {
    return errorResponse(err.message, 500, err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClientCookies();
    const { searchParams } = new URL(request.url);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    // 2. Ambil Params
    const keyword = searchParams.get("keyword");
    const page = parseInt(searchParams.get("page") || "1");
    const limitParam = searchParams.get("limit");
    const isGetAll = limitParam === "all";
    const limit = isGetAll ? 999999 : parseInt(limitParam || "10");

    // 3. Base Query dengan Join ke Themes (untuk ambil gambar/nama tema)
    let query = supabase
      .from("invitations")
      .select("*, themes(*)", { count: "exact" })
      .eq("user_id", user.id); // Security: Filter by owner

    // 4. Filter Search (Keyword di domain atau heading)
    if (keyword) {
      query = query.or(`domain.ilike.%${keyword}%,heading.ilike.%${keyword}%`);
    }

    // 5. Sorting (Terbaru dulu)
    query = query.order("created_at", { ascending: false });

    // 6. Logic Pagination
    if (!isGetAll) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    // 7. Response Handling [cite: 2026-02-22]
    if (isGetAll) {
      return successResponse(data, "All invitations retrieved successfully");
    }

    return paginateResponse(
      data,
      page,
      limit,
      count || 0,
      "Invitations retrieved successfully",
    );
  } catch (err: any) {
    return errorResponse(err.message, 500, err);
  }
}
