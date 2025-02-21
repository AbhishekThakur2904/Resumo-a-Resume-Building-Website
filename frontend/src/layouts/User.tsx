import { Box, createStyles, Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/User/Sidebar";
import { links } from "../assets/adminSidebarLinks";
type Props = {};
const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      marginLeft: "15rem",
      padding: "1rem",
      marginTop: "60px",
    },
  });

const Admin: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { root } = useStyle(theme);
  return (
    <Box>
      <Navbar />
      <Sidebar links={links} />
      <Box sx={root}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin;
