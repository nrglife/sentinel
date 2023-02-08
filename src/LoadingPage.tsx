import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";

const LoadingPage = ({ children }: any) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
    }}
  >
    <CircularProgress />
    <div>{children}</div>
  </Box>
);

export default LoadingPage;
