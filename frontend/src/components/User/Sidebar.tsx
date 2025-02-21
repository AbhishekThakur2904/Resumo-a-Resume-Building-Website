import { Box, createStyles, Drawer, Theme, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React from "react";
type Props = {
  children?: React.ReactNode;
  links: ILink[];
};
interface ILink {
  title: string;
  path: string;
  icon: JSX.Element;
}
const useStyle = (theme: Theme) =>
  createStyles({
    sidebar: {
      backgroundColor: "lightgrey",
      height: "100vh",
      display: "flex",
      width: "15rem",
      flexDirection: "column",
      paddingY: "1rem",
      transition: "all 0.5s ease",

      a: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        display: "flex",
        columnGap: "10px",
        padding: "0.25rem",
        transition: "all 0.5s ease",
        "&:hover": {
          backgroundColor: "lightgrey",
        },
      },
      ".active": {
        borderRight: `8px solid ${theme.palette.primary.main}`,
      },
    },
  });

const Sidebar: React.FC<Props> = (props) => {
  const { links } = props;
  const theme = useTheme();
  const styles = useStyle(theme);
  const { pathname } = useLocation();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: "15rem",
          boxSizing: "border-box",
          zIndex: "0",
          height: "100vh",
          marginTop: "60px",
        },
      }}
    >
      <Box sx={styles.sidebar}>
        {links?.map((link) => (
          <Link
            className={pathname === link.path ? "active" : ""}
            key={link.title}
            to={link.path}
          >
            <p>{link.icon}</p>
            <p>{link.title}</p>
          </Link>
        ))}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
