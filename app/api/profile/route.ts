import { errorResponse, successResponse } from "@/lib/api-response";
import { createClientCookies } from "@/lib/supabase-server";

export async function PATCH(req: Request) {
  const supabase = await createClientCookies();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user)
    return errorResponse("Sesi berakhir, silakan login ulang", 401);

  const body = await req.json();
  const { full_name, phone_number, avatar_url } = body;

  try {
    const { error: updateAuthError } = await supabase.auth.updateUser({
      data: {
        full_name: full_name,
        avatar_url: avatar_url,
      },
    });

    if (updateAuthError) throw updateAuthError;

    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name,
        phone_number,
        avatar_url,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (profileError) throw profileError;

    return successResponse(
      {
        user: {
          ...updatedProfile,
          email: user.email,
          provider: user.app_metadata.provider,
        },
      },
      "Berhasil memperbarui profil",
    );
  } catch (err: any) {
    return errorResponse(err.message || "Gagal memperbarui profil");
  }
}
