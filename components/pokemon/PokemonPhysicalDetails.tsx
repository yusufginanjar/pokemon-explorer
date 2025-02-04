import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomBox } from "./CustomBox";
import { convertToMeter, convertToKg } from "../../utils/converts";

interface PokemonPhysicalDetailsProps {
  height: number;
  weight: number;
}

export const PokemonPhysicalDetails: React.FC<PokemonPhysicalDetailsProps> = ({
  height,
  weight,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom align="center" color="primary">
        Height
      </Typography>
      <CustomBox>
        <Typography>{convertToMeter(height)} m</Typography>
      </CustomBox>
      <Box sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom align="center" color="primary">
            Weight
        </Typography>
        <CustomBox>
            <Typography>{convertToKg(weight)} kg</Typography>
        </CustomBox>
    </Box>
    );
}
