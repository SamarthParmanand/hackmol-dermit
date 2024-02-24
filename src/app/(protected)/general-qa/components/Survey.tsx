"use client";

import "survey-core/defaultV2.css";
import { Survey as SurveyComponent } from "survey-react-ui";
import { Model } from "survey-core";
import { data } from "./qa-data";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Survey() {
  const [survey, setSurvey] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const survey = new Model(data);
    survey.onComplete.add((res) => console.log(res.data));
    survey.onComplete.add(() => {
      toast.success("Response Saved!\n Redirecting to Home Page", {
        duration: 3000,
      });
      router.push("/");
    });
    setSurvey(survey);
  }, [router]);

  return survey && <SurveyComponent model={survey} />;
}
