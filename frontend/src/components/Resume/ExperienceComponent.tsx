import React from "react";
import {
  TextField,
  Box,
  FormLabel,
  useTheme,
  Button,
  FormHelperText,
  Divider,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useCreateExperienceMutation,
  useUpdateResumeMutation,
} from "../../services/api";
import { useSearchParams } from "react-router-dom";

interface ExperienceProps {
  nextStep: () => void;
}

export interface Experience {
  company: string;
  position: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
}

const Experience: React.FC<ExperienceProps> = (props) => {
  const [query, setQuery] = useSearchParams();
  const resumeId = query.get("resumeId");
  const [createExperience] = useCreateExperienceMutation();
  const [updateResume] = useUpdateResumeMutation();
  const { nextStep } = props;
  const theme = useTheme();

  const schema = yup.object({
    experience: yup.array().of(
      yup.object({
        company: yup.string().required("Please Enter Company Name"),
        position: yup.string().required("Please Enter Position"),
        startDate: yup.date().required("Please Enter Start Date"),
        endDate: yup.date().required("Please Enter End Date"),
        description: yup
          .string()
          .max(500, "Description cannot exceed 500 characters")
          .required("Please Enter Description"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<{ experience: Experience[] }>({
    resolver: yupResolver(schema),
    defaultValues: {
      experience: [
        {
          company: "",
          position: "",
          startDate: null,
          endDate: null,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = async (data: { experience: Experience[] }) => {
    console.log("Experience Data Submitted:", data);
    try {
      const res = await createExperience(
        data.experience.map((e) => e)
      ).unwrap();
      console.log(res)
      if (res.success) {
        const response = await updateResume({
          resumeId,
          data: { experience: res.data.map((r: { _id: string }) => r._id) },
        }).unwrap();
        console.log(response)
        if (response.success) {
          nextStep();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={() =>
          append({
            company: "",
            position: "",
            startDate: null,
            endDate: null,
            description: "",
          })
        }
        variant="outlined"
        sx={{ marginBottom: "20px", position: "absolute", right: "15px" }}
      >
        Add Field
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: "600px",
          rowGap: "10px",
          padding: "20px",
          boxShadow: "0px 0px 100px -20px",
          borderRadius: "7px",
        }}
      >
        <h1>Work Experience</h1>
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ marginBottom: "20px" }}>
            <Button
              onClick={() => remove(index)}
              color="error"
              variant="contained"
              sx={{ marginLeft: "auto", position: "absolute", right: "20px" }}
            >
              Remove
            </Button>
            <div>
              <FormLabel htmlFor={`experience[${index}].company`}>
                Company Name
              </FormLabel>
              <TextField
                fullWidth
                id={`experience[${index}].company`}
                {...register(`experience.${index}.company`)}
                placeholder="Enter Company Name"
                error={!!errors.experience?.[index]?.company}
                helperText={errors.experience?.[index]?.company?.message}
                variant="outlined"
              />
            </div>
            <div>
              <FormLabel htmlFor={`experience[${index}].position`}>
                Position
              </FormLabel>
              <TextField
                fullWidth
                id={`experience[${index}].position`}
                {...register(`experience.${index}.position`)}
                placeholder="Enter Position"
                error={!!errors.experience?.[index]?.position}
                helperText={errors.experience?.[index]?.position?.message}
                variant="outlined"
              />
            </div>
            <FormLabel htmlFor={`experience[${index}].startDate`}>
              Start Date
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DatePicker
                  onChange={(newValue) => {
                    const val = newValue ? newValue.format("YYYY-MM-DD") : null;
                    setValue(`experience.${index}.startDate`, val || null);
                  }}
                />
              </DemoContainer>
              {errors.experience?.[index]?.startDate && (
                <FormHelperText error>
                  {errors.experience[index].startDate?.message}
                </FormHelperText>
              )}
            </LocalizationProvider>
            <FormLabel htmlFor={`experience[${index}].endDate`}>
              End Date
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DatePicker
                  onChange={(newValue) => {
                    const val = newValue ? newValue.format("YYYY-MM-DD") : null;
                    setValue(`experience.${index}.endDate`, val || null);
                  }}
                />
              </DemoContainer>
              {errors.experience?.[index]?.endDate && (
                <FormHelperText error>
                  {errors.experience[index].endDate?.message}
                </FormHelperText>
              )}
            </LocalizationProvider>
            <div>
              <FormLabel htmlFor={`experience[${index}].description`}>
                Description
              </FormLabel>
              <TextField
                fullWidth
                id={`experience[${index}].description`}
                {...register(`experience.${index}.description`)}
                placeholder="Describe your role and responsibilities"
                multiline
                rows={4}
                error={!!errors.experience?.[index]?.description}
                helperText={errors.experience?.[index]?.description?.message}
                variant="outlined"
              />
            </div>
            <Divider sx={{ borderBottom: "1px solid", marginTop: "20px" }} />
          </Box>
        ))}

        <Button sx={{ width: "100%" }} type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Experience;
