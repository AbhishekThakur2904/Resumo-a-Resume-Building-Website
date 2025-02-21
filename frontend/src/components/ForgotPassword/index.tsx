import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./forgot-password.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotMutation } from "../../services/api";
import toast from "react-hot-toast";
import { formVariants } from "../../animation";
import { motion } from "motion/react";

type Props = {};
type User = {
  email: string;
};

const ForgotPasswordComponent = (props: Props) => {
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Please Enter Email"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });
  const [forgotPassword, { isLoading, isSuccess, isError, error }] =
    useForgotMutation();

  const onSubmit = async (data: User) => {
    try {
      const res = await forgotPassword(data).unwrap();
      if (res?.success) {
        toast.success("Link has been sent to your email");
      }
      console.log(res);
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || "Something went wrong!");
      console.log(err);
    }
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <div>
        <h1>Forgot Password</h1>
        <div>
          <FormLabel htmlFor="name">Email</FormLabel>
          <TextField
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
          />
        </div>
        <Button disabled={isLoading} type="submit" variant="contained">
          {isLoading ? "Submitting..." : "Forgot Password"}
        </Button>
      </div>
    </motion.form>
  );
};

export default ForgotPasswordComponent;
