import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { useState } from "react";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUserMutation } from "../../services/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setTokens, setUser } from "../../redux/reducer/authSlice";
import { motion } from "motion/react";
import { formVariants } from "../../animation";
import { useTranslation } from "react-i18next";
type Props = {};
const schema = yup
  .object({
    email: yup.string().email("Invalid email address").required("Please Enter Email"),
    password: yup.string().required("Please Enter Password"),
  })
  .required();

// Infer the schema type to match form values
type User = yup.InferType<typeof schema>;

const LoginComponent = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });
  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const onSubmit = async (data: User) => {
    try {
      const res = await loginUser(data).unwrap();
      if (res?.success) {
        dispatch(
          setTokens({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );
        dispatch(setUser({ user: res.data.user }));
        toast.success("User Login Successfully");
        navigate("/");
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
        <h1>{t("header.login")}</h1>
        <div>
          <FormLabel htmlFor="name">{t("header.email")}</FormLabel>
          <TextField
            label={t("header.email")}
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
          />
        </div>

        <div className={styles.password}>
          <FormLabel htmlFor="name">{t("header.password")}</FormLabel>
          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            label={t("header.password")}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            name="password"
            variant="outlined"
          />
          <div className={styles.icon}>
            {showPassword ? (
              <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <FaEye onClick={() => setShowPassword(!showPassword)} />
            )}
          </div>
        </div>

        <Button disabled={isLoading} type="submit" variant="contained">
          {isLoading ? "Submitting..." : t("header.submit")}
        </Button>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/forgot-password"
        >
          {t("header.forgotPassword")}?
        </Link>
      </div>
    </motion.form>
  );
};

export default LoginComponent;
