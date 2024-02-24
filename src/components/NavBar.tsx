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

export default function NavBar() {
  const pathname = usePathname();
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
            <Button
              as={Link}
              className="text-neutral-700"
              color="primary"
              href="/auth"
              variant="shadow"
              endContent={
                <FaArrowUpRightFromSquare className="ml-1 text-neutral-700" />
              }
            >
              Try Out
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
}
