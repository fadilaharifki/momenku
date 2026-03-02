import { NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";

export async function POST() {
  const supabase = await createClientCookies();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return errorResponse(error.message, 500);
    }

    return successResponse(null, "Logged out successfully");
  } catch (err) {
    return errorResponse("Internal Server Error", 500);
  }
}
