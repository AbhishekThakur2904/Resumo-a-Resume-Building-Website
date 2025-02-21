import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Control } from "react-hook-form";

import PersonalInfo from "./PersonalInfoComponent";
import Education from "./EducationComponent";
import Experience from "./ExperienceComponent"; // Import Experience component
import Skill from "./Skill";


const ResumeEditor: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const steps = ["Personal Info", "Education", "Experience", "Skills"];

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        Resume Builder
      </Typography>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={4}>
        {step === 0 && <PersonalInfo nextStep={nextStep} />}
        {step === 1 && <Education nextStep={nextStep} />}
        {step === 2 && <Experience nextStep={nextStep} />}{" "}
        {step === 3 && <Skill nextStep={nextStep} />}{" "}

      </Box>
    </Box>
  );
};

export default ResumeEditor;
