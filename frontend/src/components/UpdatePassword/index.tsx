import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./update-password.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateMutation } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};
type User = {
  password: string;
};

const UpdatePasswordComponent = (props: Props) => {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);
  const schema = yup
    .object({
      password: yup.string().required("Please Enter Password"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });
  const [updatePassword, { isLoading, isSuccess, isError, error }] =
    useUpdateMutation();

  const onSubmit = async (data: User) => {
    try {
      const res = await updatePassword({
        token: token,
        password: data.password,
      }).unwrap();
      if (res?.success) {
        toast.success("Password Reset Successfully");
        navigate("/login");
      }
      console.log(res);
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || "Something went wrong!");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <h1>Update Password</h1>
        <div>
          <FormLabel htmlFor="name">Password</FormLabel>
          <TextField
            id="password"
            {...register("password")}
            placeholder="Enter New Password"
            name="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
          />
        </div>
        <Button disabled={isLoading} type="submit" variant="contained">
          {isLoading ? "Submitting..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePasswordComponent;
