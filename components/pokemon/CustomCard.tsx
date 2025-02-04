import React from "react";
import { Card, CardProps } from "@mui/material";

export const CustomCard: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        opacity: 0.9,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};