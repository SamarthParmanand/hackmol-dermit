import type { Metadata } from "next";
import Prodivers from "../providers";
import InitUser from "@/components/InitUser";

export const metadata: Metadata = {
  title: "Hackmol 5.0",
  description: "DermIT-The Batch",
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
