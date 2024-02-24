import { HoverEffect } from "@/ui/HoverCards";
import BackgroundBeams, { paths } from "@/ui/BackgroundBeams";

export default function Walkthrough() {
  return (
    <div className="w-full h-[90dvh] mx-auto px-8 relative flex flex-col items-center justify-center">
      <h1 className="relative z-10 text-3xl md:text-7xl md:py-4 md:my-3 bg-clip-text text-transparent bg-gradient-to-b from-primary-200 to-secondary-800 text-center font-sans font-bold">
        Walking through the steps
      </h1>
      <p />
      <HoverEffect items={steps} className="w-[80rem]" />
      <BackgroundBeams paths={paths} />
    </div>
  );
}
const steps = [
  {
    title: "User Signs In with Google",
    description: [
      "Begin by signing in with your Google account.",
      "This step ensures seamless authentication and access to personalized features.",
    ],
    link: "/auth",
  },
  {
    title: "Profile Completion",
    description: [
      "Upon signing in, you'll be directed to your profile page.",
      "If you haven't completed your profile yet, you'll be prompted to provide essential information such as your name, age, and gender.",
      "Completing your profile ensures that you receive personalized recommendations and services tailored to your needs.",
    ],
    link: "/profile",
  },
  {
    title: "General Q&A Section Based on Lifestyle",
    description: [
      "After completing your profile, you'll enter a general question and answer section.",
      "Here, you'll be asked questions about your lifestyle, habits, and any specific concerns you may have regarding skincare or dermatological issues.",
      "Your responses will help customize the subsequent modules to better address your needs and preferences.",
    ],
    link: "/general-qa",
  },
  {
    title: "Computer Vision Module",
    description: [
      "In this module, you'll have the option to upload images of any symptoms or affected areas that you'd like to address.",
      "Our advanced computer vision technology will analyze the images to provide insights and potential diagnoses.",
      "This feature allows for visual assessment and monitoring of any skin-related issues you may have.",
    ],
    link: "/capture",
  },
  {
    title: "NLP Module for Querying LLM",
    description: [
      "Next, you'll engage with our Natural Language Processing (NLP) module.",
      "Here, you can input queries or describe your concerns in natural language, just as you would speak to a dermatologist.",
      "Our Language Model (LLM), powered by cutting-edge technologies including Pinecone, LLAMAINDEX, Langchain, and OpenAI, will process your queries to provide accurate and informative responses.",
    ],
    link: "/query",
  },
  {
    title: "Response Generation",
    description: [
      "Finally, the LLM will generate comprehensive responses based on your queries.",
      "These responses leverage state-of-the-art AI capabilities to offer expert insights, recommendations, and advice regarding your skincare or dermatological concerns.",
      "You can rely on these responses for reliable information and guidance on managing your skin health effectively.",
    ],
    link: "/query",
  },
];
