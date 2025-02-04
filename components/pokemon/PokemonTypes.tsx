import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { PokemonDetail } from "../../interfaces/PokemonDetail";

interface PokemonTypesProps {
  types: PokemonDetail["types"];
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({ types }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom color="primary">
        Types
      </Typography>
      <List dense>
        {types.map((type, index) => (
          <ListItem key={`type-${index}`}>&#8226; {type.type.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};