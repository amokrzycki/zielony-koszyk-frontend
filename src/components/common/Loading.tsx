import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box className={"flex w-full h-full items-center justify-center"}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
