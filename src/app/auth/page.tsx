"use client";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import createClient from "@/utils/supabase/client";
import toast from "react-hot-toast";
import authState from "@/store/user";
import { CgGoogle } from "react-icons/cg";

export default function Page() {
  const supabase = createClient();
  const snap = useSnapshot(authState);
  const router = useRouter();

  useEffect(() => {
    const checkUserData = setTimeout(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id) {
        authState.user = user;

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error?.code === "PGRST116") {
          // code which is returned by supabase if the row doesnt exist on user table
          toast("Please update your profile.");
          if (!data || !data.name || !data.age || !data.gender) {
            router.push("/profile");
          }
        } else {
          toast.success("Profile Checked");
          router.push("/general-qa");
        }
      }
    }, 100);

    return () => {
      clearTimeout(checkUserData);
    };
  }, [router, supabase]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_ORIGIN + "/auth/callback",
      },
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <Card className="h-1/4 w-3/4 md:w-[360px]" isBlurred>
        <CardHeader className="mt-4">
          <p className="w-full font-bold text-center text-xl md:text-2xl">
            Welcome! <br /> Sign in to get started
          </p>
        </CardHeader>
        <CardBody className="flex flex-col justify-around py-2">
          <Button
            startContent={<CgGoogle className="pt-0.5" />}
            onClick={handleLogin}
            className="dermit-btn"
          >
            Sign In
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
