import React from "react";
import CreateResume from "../components/Resume";
import {
  Box,
  Button,
  createStyles,
  FormLabel,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useCreateResumeMutation } from "../services/api";
type Props = {};

interface IResume {
  title: string;
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
      height: "calc(100vh - 100px)",
    },
  });

const CreateResumePage: React.FC<Props> = (props) => {
  const [createResume, { isLoading, isSuccess, isError }] =
    useCreateResumeMutation();

  const theme = useTheme();
  const { root, box } = useStyle(theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const schema = yup
    .object({
      title: yup.string().required("Please Title to Resume"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResume>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IResume) => {
    console.log(data);

    try {
      const res = await createResume(data).unwrap();
      console.log(res);
      if (res.success) {
        navigate({
          pathname: "/resume",
          search: `?resumeId=${res.data._id}`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={box}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={root}>
        <h1>Create Resume</h1>
        <FormLabel htmlFor="name">Title</FormLabel>
        <TextField
          fullWidth
          label="Title"
          id="title"
          {...register("title")}
          placeholder="Enter Title of the Resume"
          name="title"
          error={!!errors.title}
          helperText={errors.title?.message}
          variant="outlined"
        />
        <Button disabled={isLoading} type="submit" variant="contained">
          {isLoading ? "Creating..." : "Create Resume"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateResumePage;
