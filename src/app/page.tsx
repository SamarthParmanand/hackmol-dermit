"use client";

import { Button } from "@nextui-org/react";
import createClient from "@/utils/supabase/client";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  supabase.auth.getUser().then((res) => setUser(res.data.user));

  return (
    <>
      <p>nextui & supabase init</p>
      <p>welcome {user?.user_metadata?.full_name}</p>
      <Button onClick={() => toast.success("toast example")}>
        Thats great!
      </Button>
    </>
  );
}
