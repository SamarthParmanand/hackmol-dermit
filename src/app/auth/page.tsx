"use client";
import { Button } from "@nextui-org/react";
import createClient from "@/utils/supabase/client";
import { useSnapshot } from "valtio";
import authState from "@/store/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Page() {
  const supabase = createClient();
  const snap = useSnapshot(authState);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.id) {
        toast("Already logged in");
        router.push("/profile");
      }
    }, 10);
    return () => clearTimeout(timeout);
  });
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
    <div className="h-screen w-screen flex justify-center items-center">
      <p>gonna use google sign using supabase in here</p>
      <Button onClick={handleLogin}>Login with google</Button>
    </div>
  );
}
