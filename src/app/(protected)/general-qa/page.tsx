"use client";
import toast from "react-hot-toast";
import Survey from "./components/Survey";
import { useEffect } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { v: number };
}) {
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      if (searchParams.v == 1) {
        toast.success("Profile Verified");
      }
    }, 100);
    return () => clearTimeout(toastTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll">
      <div className="w-full text-center text-2xl font-bold my-2 px-3">
        General lifestyle-based questions
      </div>
      <Survey />
    </div>
  );
}
