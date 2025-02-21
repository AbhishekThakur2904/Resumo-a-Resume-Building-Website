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
import { useSearchParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs"; // ✅ Import dayjs

import {
  useCreateEducationalInfoMutation,
  useUpdateResumeMutation,
} from "../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

interface EducationProps {
  nextStep: () => void;
}

interface IEducation {
  school: string;
  degree: string;
  startDate: string | null;
  endDate: string | null;
}

const schema: yup.ObjectSchema<{ education?: IEducation[] }> = yup.object({

  education: yup
    .array()
    .of(
      yup.object({
        school: yup.string().required("Please Enter School Name"),
        degree: yup.string().required("Please Enter Degree Name"),
        startDate: yup.string().nullable().required("Please Enter Start Date"),
        endDate: yup.string().nullable().required("Please Enter End Date"),
      })
    )
    .required()
    .min(1, "At least one education entry is required"),
});


const Education: React.FC<EducationProps> = ({ nextStep }) => {
  const [query] = useSearchParams();
  const resumeId = query.get("resumeId");
  const [createEduction, { isLoading }] = useCreateEducationalInfoMutation();
  const [updateResume] = useUpdateResumeMutation();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<{ education: IEducation[] }>({
    resolver: yupResolver(schema),
  defaultValues: {
  education: [{ school: "", degree: "", startDate: null as string | null, endDate: null as string | null }],
},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = async (data: { education: IEducation[] }) => {
    try {
      console.log(data);
      const res = await createEduction(data.education).unwrap();
      console.log(res);
      if (res.success) {
        const response = await updateResume({
          resumeId,
          data: { education: res.data.map((r: { _id: string }) => r._id) },
        }).unwrap();
        if (response.success) {
          nextStep();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
       onClick={() => append({ school: "", degree: "", startDate: null, endDate: null })}
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
          boxShadow: " 0px 0px 100px -20px",
          borderRadius: "7px",
        }}
      >
        <h1>Educational Info</h1>
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
              <FormLabel htmlFor={`education[${index}].school`}>School Name</FormLabel>
              <TextField
                fullWidth
                id={`education[${index}].school`}
                {...register(`education.${index}.school`)}
                placeholder="Enter Your School Name"
                error={!!errors.education?.[index]?.school}
                helperText={errors.education?.[index]?.school?.message}
                variant="outlined"
              />
            </div>
            <div>
              <FormLabel htmlFor={`education[${index}].degree`}>Degree</FormLabel>
              <TextField
                fullWidth
                id={`education[${index}].degree`}
                {...register(`education.${index}.degree`)}
                placeholder="Enter Your Degree"
                error={!!errors.education?.[index]?.degree}
                helperText={errors.education?.[index]?.degree?.message}
                variant="outlined"
              />
            </div>
            <FormLabel htmlFor={`education[${index}].startDate`}>Start Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
              <DatePicker
  value={field.startDate ? dayjs(field.startDate) : null}
              onChange={(newValue) => {
              const val = newValue ? newValue.format("YYYY-MM-DD") : null;
              setValue(`education.${index}.startDate`, val, { shouldValidate: true });
            }}
/>
              </DemoContainer>
              {errors.education?.[index]?.startDate && (
                <FormHelperText error>{errors.education[index].startDate?.message}</FormHelperText>
              )}
            </LocalizationProvider>
            <FormLabel htmlFor={`education[${index}].endDate`}>End Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DatePicker
                  value={field.endDate ? dayjs(field.endDate) : null}
                  onChange={(newValue) => {
                    const val = newValue ? newValue.format("YYYY-MM-DD") : null;
                    setValue(`education.${index}.endDate`, val);
                  }}
                />
              </DemoContainer>
              {errors.education?.[index]?.endDate && (
                <FormHelperText error>{errors.education[index].endDate?.message}</FormHelperText>
              )}
            </LocalizationProvider>
            <Divider sx={{ borderBottom: "1px solid", marginTop: "20px" }} />
          </Box>
        ))}

        <Button disabled={isLoading} sx={{ width: "100%" }} type="submit" variant="contained">
          {isLoading ? "Loading..." : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default Education;
