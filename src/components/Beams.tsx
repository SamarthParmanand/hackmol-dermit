"use client";
import BackgroundBeams, { paths_rev } from "./ui/BackgroundBeams";

export default function Beams() {
  return (
    <div className="h-[90dvh] md:h-[100dvh] relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="relative z-10 text-3xl md:text-7xl md:py-4 md:my-3 bg-clip-text text-transparent bg-gradient-to-b from-primary-200 to-secondary-800 text-center font-sans font-bold">
          Revolutionizing Dermatology with AI
        </h1>
        <p />
        <p className="text-neutral-400 max-w-sm md:max-w-2xl mx-auto my-2 letx-medium md:text-lg text-center relative z-10">
          With emerging advancements in artificial intelligence, DermIT aims to
          provide you with a doctor-like environment right at your fingertips.
          Our platform utilizes cutting-edge AI technologies to offer accurate
          diagnoses, comprehensive reports, and personalized treatment
          recommendations.
        </p>
      </div>
      <BackgroundBeams paths={paths_rev} />
    </div>
  );
}
