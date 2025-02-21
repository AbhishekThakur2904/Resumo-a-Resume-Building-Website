import React from "react";
import {
  TextField,
  Box,
  Typography,
  createStyles,
  Theme,
  useTheme,
  FormLabel,
  Button,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {  useSearchParams } from "react-router-dom";
import {
  useCreatePersonalInfoMutation,
  useUpdateResumeMutation,
} from "../../services/api";

interface PersonalInfoProps {
  nextStep: () => void;
}
interface IPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      fontSize: "2rem",
      fontWeight: "500",
      display: "flex",
      width: "23rem",
      rowGap: "10px",
      padding: "20px",
      flexDirection: "column",
      justifyContent: "center",
      boxShadow: " 0px 0px 100px -20px",
      borderRadius: "7px",
      h1: {
        fontFamily: "Poppins, serif",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "1.5rem",
      },
    },
    box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
  const [query, setQuery] = useSearchParams();
  const resumeId = query.get("resumeId");
  const [createPersonalInfo, { isLoading, isError }] =
    useCreatePersonalInfoMutation();

  const [updateResume] = useUpdateResumeMutation();
  const { nextStep } = props;
  const theme = useTheme();
  const { root, box } = useStyle(theme);
  const schema = yup
    .object({
      fullName: yup.string().required("Please Enter Name"),
      email: yup
        .string()
        .email("Please Enter Valid Email")
        .required("Please Enter Email"),
      phone: yup
        .string()
        .min(10, "Phone Number Should be 10 Digits")
        .required("Please Enter Phone Number"),
      address: yup.string().required("Please Enter Address"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonalInfo>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: IPersonalInfo) => {
    try {
      const res = await createPersonalInfo({ ...data, resumeId }).unwrap();

      if (res.success) {
        const response = await updateResume({
          resumeId,
          data: { personalInfo: res.data._id },
        }).unwrap();
        if (response.success) {
          nextStep();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={box}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={root}>
        <h1>Personal Info</h1>
        <div>
          <FormLabel htmlFor="fullName">Full Name</FormLabel>
          <TextField
            fullWidth
            label="Full Name"
            id="fullName"
            {...register("fullName")}
            placeholder="Enter Your Email"
            name="fullName"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            variant="outlined"
          />
        </div>
        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            fullWidth
            label="Email"
            id="email"
            {...register("email")}
            placeholder="Enter your Email"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
          />
        </div>
        <div>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <TextField
            fullWidth
            type="number"
            label="Phone Number"
            id="phone"
            {...register("phone")}
            placeholder="Enter your Phone Number"
            name="phone"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            variant="outlined"
          />
        </div>
        <div>
          <FormLabel htmlFor="address">Address</FormLabel>
          <TextField
            fullWidth
            label="Address"
            id="address"
            {...register("address")}
            placeholder="Enter your Address"
            name="address"
            error={!!errors.address}
            helperText={errors.address?.message}
            variant="outlined"
          />
        </div>
        <Button disabled={isLoading} type="submit" variant="contained">
          {isLoading ? "Loading..." : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
