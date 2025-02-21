import { Box, createStyles, Theme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
type Props = {};

const Basic = (props: Props) => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ marginTop: "60px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Basic;
