"use client";

import { useEffect } from "react";
import createClient from "@/utils/supabase/client";
import authState from "@/store/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function InitUser() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const userTimeout = setTimeout(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Signin Required");
        router.replace("/auth");
      }
      authState.user = user;
    }, 10); //timeout of 0.01s so that is is snappy and doesnt render the toast twice while rendering the component

    return () => clearTimeout(userTimeout);
  }),
    [];

  return <></>;
}
