import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createClientCookies();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return errorResponse("Not authenticated", 401);
  }
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const mergedProfile = {
    ...profileData,
    full_name: profileData?.full_name || user.user_metadata?.full_name,
    avatar_url: profileData?.avatar_url || user.user_metadata?.avatar_url,
    isLoggedIn: !!user.id,
  };

  return successResponse({
    user: mergedProfile,
  });
}
