import type { Metadata } from "next";
import Prodivers from "../providers";
import InitUser from "@/components/InitUser";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Hackmol 5.0-DermIT",
  description: "The Batch fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InitUser />
      <Prodivers>{children}</Prodivers>
    </>
  );
}
