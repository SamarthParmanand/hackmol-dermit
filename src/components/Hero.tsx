"use client";
import BackgroundBeams, { paths } from "@/ui/BackgroundBeams";

export default function Hero() {
  return (
    <div className="h-[90dvh] md:h-[95dvh] relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-8xl md:py-4 md:my-3 bg-clip-text text-transparent bg-gradient-to-b from-primary-200 to-secondary-800 text-center font-sans font-bold">
          DermIT
        </h1>
        <p />
        <p className="text-neutral-400 max-w-sm md:max-w-2xl mx-auto my-2 letx-medium md:text-lg text-center relative z-10">
          Your one-stop solution for dermatological care.
        </p>
      </div>
      <BackgroundBeams paths={paths} />
    </div>
  );
}
