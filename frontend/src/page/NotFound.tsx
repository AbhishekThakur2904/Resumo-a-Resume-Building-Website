import { Box } from "@mui/material";
type Props = {};

const NotFound = (props: Props) => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 60px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontSize: "50px",
      }}
    >
      <p>ERROR-404</p>
    </Box>
  );
};

export default NotFound;
