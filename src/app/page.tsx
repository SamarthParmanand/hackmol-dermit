"use client";

import { Button, Link } from "@nextui-org/react";
import createClient from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const timeout = setTimeout(
      () => supabase.auth.getUser().then((res) => setUser(res.data.user)),
      10 //10ms delay
    );
    return () => clearTimeout(timeout);
  }, [supabase.auth]);

  const handleLogout = async () => {
    toast.promise(supabase.auth.signOut(), {
      loading: "logging out",
      success: "logged out",
      error: "error logging out",
    });
  };

  return (
    <>
      <p>nextui & supabase init</p>
      <p>welcome, {user ? user?.user_metadata?.full_name : "please signin"}</p>
      <Button onClick={() => toast.success("toast example")}>
        order a toast
      </Button>
      {user && <Button onClick={handleLogout}>Logout</Button>}
    </>
  );
}
