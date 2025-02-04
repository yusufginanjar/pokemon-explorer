import React from "react";
import Grid from "@mui/material/Grid2";
import { PokemonCard } from "./PokemonCard";
import { PokemonListResult } from "../../interfaces/PokemonList";

interface PokemonGridProps {
  pokemonList: PokemonListResult[];
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemonList }) => {
  return (
    <Grid container spacing={2}>
      {pokemonList.map((pokemon) => (
        <Grid key={pokemon.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
};