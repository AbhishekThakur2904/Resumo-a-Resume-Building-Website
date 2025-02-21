import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormLabel, Modal, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import styles from "./modal.module.css";
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
type Props = {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
};
type Service = {};

const UpdateServiceModal = (props: Props) => {
  const [query] = useSearchParams();
  const { open, handleClose, refetch } = props;
  const schema = yup.object({}).required();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Service>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Service> = async (data) => {
    try {
      //do something here
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || "Something went wrong!");
      console.log(err);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <Modal
      open={open}
      sx={{
        width: "100vw",
        height: "100vh",
      }}
      onClose={handleClose}
    >
      <Box
        component={motion.div}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        sx={{
          position: "absolute",
          left: "45%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <h1>Modal Heading</h1>
            {/* Manage Loading State Here while api call
            <Button disabled={isLoading} type="submit" variant="contained">
              {isLoading ? "Updating..." : "Update"}
            </Button> */}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateServiceModal;
