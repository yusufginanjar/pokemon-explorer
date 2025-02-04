import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { PokemonDetail } from "../../interfaces/PokemonDetail";

interface PokemonAbilitiesProps {
  abilities: PokemonDetail["abilities"];
}

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({ abilities }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" gutterBottom color="primary">
        Abilities
      </Typography>
      <List dense>
        {abilities.map((ability, index) => (
          <ListItem key={`ability-${index}`}>&#8226; {ability.ability.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};