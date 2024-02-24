"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        {children}
        <Toaster position="bottom-right" />
      </NextUIProvider>
    </>
  );
}
