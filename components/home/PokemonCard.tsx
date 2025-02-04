import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { PokemonListResult } from "../../interfaces/PokemonList";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: PokemonListResult;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokemonId = pokemon.url.split("/").slice(-2, -1)[0]; // Extract Pokémon ID from URL

  return (
    <Link href={`/pokemon/${pokemonId}`} passHref>
      <Card
        sx={{
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
          sx={{ height: 200, objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h6" align="center">
            {pokemon.name.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};