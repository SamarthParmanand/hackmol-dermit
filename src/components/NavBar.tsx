"use client";

import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useSnapshot } from "valtio";
import authState from "@/store/user";
import createClient from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const snap = useSnapshot(authState);
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    toast.promise(supabase.auth.signOut(), {
      loading: "Logging out",
      success: "Logged out",
      error: "Error Logging out",
    });
    authState.user = null;
    router.push("/");
  };

  if (pathname == "/auth") return;

  if (pathname == "/")
    return (
      <Navbar isBordered>
        <NavbarContent className="pr-3" justify="center">
          <NavbarBrand>
            <Button
              className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-b from-primary-700 to-secondary-500"
              as={Link}
              href="/"
            >
              DermIT
            </Button>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            {!snap.user?.id ? (
              <Button
                as={Link}
                className="dermit-btn"
                color="primary"
                href="/auth"
                variant="shadow"
                endContent={<FaArrowUpRightFromSquare className="ml-1" />}
              >
                Try Out
              </Button>
            ) : (
              <Button
                className="dermit-btn"
                color="primary"
                variant="shadow"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  // else {
  return (
    <Navbar isBordered>
      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-b from-primary-700 to-secondary-500">
            DermIT
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar
            src={snap.user?.user_metadata?.avatar_url}
            color="primary"
            isBordered
            showFallback
            as={Link}
            href="/profile"
          />
        </NavbarItem>
        <NavbarItem>
          <Button
            className="dermit-btn"
            color="primary"
            variant="shadow"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
  // }
}
