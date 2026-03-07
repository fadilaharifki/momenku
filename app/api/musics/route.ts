import { createClientCookies } from "@/lib/supabase-server";
import {
  successResponse,
  errorResponse,
  paginateResponse,
} from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClientCookies();
    const { searchParams } = new URL(request.url);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return errorResponse("Unauthorized", 401);

    const keyword = searchParams.get("keyword");
    const page = parseInt(searchParams.get("page") || "1");
    const limitParam = searchParams.get("limit");
    const isGetAll = limitParam === "all";
    const limit = isGetAll ? 999999 : parseInt(limitParam || "10");

    // 3. Base Query
    let query = supabase.from("musics").select("*", { count: "exact" });

    if (keyword) {
      query = query.or(`title.ilike.%${keyword}%,author.ilike.%${keyword}%`);
    }

    query = query.order("title", { ascending: true });

    if (!isGetAll) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    if (isGetAll) {
      return successResponse(data, "All musics retrieved successfully");
    }

    return paginateResponse(
      data,
      page,
      limit,
      count || 0,
      "Musics retrieved successfully",
    );
  } catch (err: any) {
    return errorResponse(err.message, 500, err);
  }
}
