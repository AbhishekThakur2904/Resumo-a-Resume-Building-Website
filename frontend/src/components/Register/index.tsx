import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import styles from "./register.module.css";
import { ROLES } from "../../assets/constraints";
import { useState } from "react";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formVariants } from "../../animation";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
type Props = {};
type User = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
};

const RegisterComponent = (props: Props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const schema = yup
    .object({
      name: yup.string().required("Please Enter Name"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Please Enter Email"),
      password: yup.string().required("Please Enter Password"),
      role: yup.string().required("Please Select Role"),
    })
    .required();
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const onSubmit = async (data: User) => {
    try {
      const res = await registerUser(data).unwrap();
      if (res?.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      }
      console.log(res);
    } catch (err) {
      toast.error("Error While Creating User");
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
        <h1>{t("header.register")}</h1>
        <div>
          <FormLabel htmlFor="name">{t("header.name")}</FormLabel>
          <TextField
            label={t("header.name")}
            {...register("name")}
            id="name"
            placeholder="Enter your name"
            name="name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </div>
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
        <div>
          <FormLabel htmlFor="role">{t("header.role")}</FormLabel>
          <FormControl error={!!errors.role} fullWidth>
            <InputLabel id="role">{t("header.role")}</InputLabel>
            <Controller
              defaultValue=""
              name="role"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="role" id="role" label={t("header.role")}>
                  {ROLES.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>
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
          {isLoading ? "Submitting..." : t("header.submit") }
        </Button>
      </div>
    </motion.form>
  );
};

export default RegisterComponent;
