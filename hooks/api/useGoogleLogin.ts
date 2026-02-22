import { createClientComponentClient } from "@/lib/supabase-client";

export function useGoogleLogin() {
  const supabase = createClientComponentClient();
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("Google Auth Error:", error.message);
    }
  };

  return { handleGoogleLogin };
}
