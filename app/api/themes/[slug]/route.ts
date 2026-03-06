import { createClientCookies } from "@/lib/supabase-server";
import { successResponse, errorResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const supabase = await createClientCookies();

    const { data, error } = await supabase
      .from("themes")
      .select(
        `
    *,
    category:categories(id, name, slug),
    sections:theme_sections(*) 
  `,
      )
      .eq("slug", slug)
      .order("order", { foreignTable: "theme_sections", ascending: true })
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        return errorResponse("Theme not found", 404);
      }
      throw error;
    }

    return successResponse(data, "Theme retrieved successfully");
  } catch (err: any) {
    return errorResponse(err.message, 500, err);
  }
}
