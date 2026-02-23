import { createClientCookies } from "@/lib/supabase-server";
import {
  successResponse,
  paginateResponse,
  errorResponse,
} from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClientCookies();
    const { searchParams } = new URL(request.url);

    const keyword = searchParams.get("keyword");
    const page = parseInt(searchParams.get("page") || "1");
    const limitParam = searchParams.get("limit");
    const isGetAll = limitParam === "all";
    const limit = isGetAll ? 999999 : parseInt(limitParam || "10");

    let query = supabase.from("categories").select("*", { count: "exact" });

    if (keyword) {
      query = query.ilike("name", `%${keyword}%`);
    }

    query = query.order("name", { ascending: true });

    if (!isGetAll) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    if (isGetAll) {
      return successResponse(data, "All categories retrieved successfully");
    }

    return paginateResponse(
      data,
      page,
      limit,
      count || 0,
      "Categories retrieved successfully",
    );
  } catch (err: any) {
    return errorResponse(err.message, 500, err);
  }
}
