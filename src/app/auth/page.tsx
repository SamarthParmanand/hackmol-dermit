"use client";
import { Button } from "@nextui-org/react";
import createClient from "@/utils/supabase/client";

export default function page() {
  const supabase = createClient();
  const handleLogin = async () => {
    console.log(process.env.NEXT_PUBLIC_ORIGIN);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_ORIGIN + "/auth/callback",
      },
    });
  };

  return (
    <div>
      gonna use google sign using supabase in here
      <Button onClick={handleLogin}>Login with google</Button>
    </div>
  );
}
