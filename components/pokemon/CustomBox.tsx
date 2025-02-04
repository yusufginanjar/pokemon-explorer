import React from "react";
import { Box, BoxProps } from "@mui/material";

export const CustomBox: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 1,
        borderColor: "#e0e0e0",
        backgroundColor: "#f5f5f5",
        padding: 1,
        textAlign: "center",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};