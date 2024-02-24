"use client";

import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useSnapshot } from "valtio";
import authState from "@/store/user";
import createClient from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function NavBar() {
  const snap = useSnapshot(authState);
  const supabase = createClient();
  const pathname = usePathname();

  const handleLogout = async () => {
    toast.promise(supabase.auth.signOut(), {
      loading: "logging out",
      success: "logged out",
      error: "error logging out",
    });
    authState.user = null;
  };

  if (pathname == "/")
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
            {!snap.user?.id ? (
              <Button
                as={Link}
                className="text-neutral-900"
                color="primary"
                href="/auth"
                variant="shadow"
                endContent={
                  <FaArrowUpRightFromSquare className="ml-1 text-neutral-800" />
                }
              >
                Try Out
              </Button>
            ) : (
              <Button
                className="text-neutral-900"
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
}
