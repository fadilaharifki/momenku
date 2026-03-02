import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const supabase = await createClientCookies();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return errorResponse("Invalid credentials or unverified email.", 401);
    }

    return successResponse(
      null,
      "Login Successfully. Welcome back to Momenku.",
    );
  } catch (err: any) {
    return errorResponse("An unexpected error occurred during login.", 500);
  }
}
