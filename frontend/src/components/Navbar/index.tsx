import { Box, createStyles, Theme, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./navbar.module.css";
import NavbarLinks from "./NavbarLinks";
import { Link } from "react-router-dom";

type Props = {};

const useStyle = (theme: Theme) =>
  createStyles({
    logo: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      transition: "all 0.5s ease",
      "&:hover": {
        scale: 1.05,
      },
    },
  });

const Navbar = (props: Props) => {
  const theme = useTheme();
  const { logo } = useStyle(theme);
  const { t } = useTranslation();

  return (
    <Box className={styles.navbar}>
      <Box sx={logo} component={Link} to="/">
        {t("header.title")}
      </Box>
      <Box className={styles.navbarlinks}>
        <NavbarLinks />
      </Box>
    </Box>
  );
};

export default Navbar;
