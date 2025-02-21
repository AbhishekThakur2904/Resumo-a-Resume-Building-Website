import React from "react";
import { TextField, Box, Button, FormLabel, Divider } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateResumeMutation } from "../../services/api";
import toast from "react-hot-toast";

interface SkillProps {
  nextStep: () => void;
}

const Skill: React.FC<SkillProps> = ({ nextStep }) => {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const resumeId = query.get("resumeId");
  const [updateResume] = useUpdateResumeMutation();
  const schema = yup
    .object({
      skills: yup
        .array()
        .of(yup.string().required("Please enter a skill"))
        .required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ skills: string[] }>({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = async (data: { skills: string[] }) => {
    console.log(data.skills);
    try {
      console.log(data);

      const response = await updateResume({
        resumeId,
        data: { skills: data.skills },
      }).unwrap();
      if (response.success) {
        toast.success("Resume Has Been Successfully Build");
        navigate("/")
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={() => append("")}
        variant="outlined"
        sx={{ marginBottom: "20px", position: "absolute", right: "15px" }}
      >
        Add Skill
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
        <h1>Skills</h1>
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
              <FormLabel htmlFor={`skills[${index}]`}>Skill</FormLabel>
              <TextField
                fullWidth
                id={`skills[${index}]`}
                {...register(`skills.${index}`)}
                placeholder="Enter a skill"
                error={!!errors.skills?.[index]}
                helperText={errors.skills?.[index]?.message}
                variant="outlined"
              />
            </div>
            <Divider sx={{ borderBottom: "1px solid", marginTop: "20px" }} />
          </Box>
        ))}

        <Button sx={{ width: "100%" }} type="submit" variant="contained">
          Finish
        </Button>
      </Box>
    </Box>
  );
};

export default Skill;
