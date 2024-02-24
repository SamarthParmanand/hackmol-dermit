"use client";

import "survey-core/defaultV2.css";
import { Survey as SurveyComponent } from "survey-react-ui";
import { Model } from "survey-core";
import { data } from "./qa-data";
import { useState, useEffect } from "react";

export default function Survey() {
  const [survey, setSurvey] = useState<any>(null);

  useEffect(() => {
    const survey = new Model(data);
    survey.onComplete.add((res) => console.log(res.data));
    setSurvey(survey);
  }, []);

  return survey && <SurveyComponent model={survey} />;
}
