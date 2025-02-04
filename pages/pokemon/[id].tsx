import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  PokemonImage,
  PokemonAbilities,
  PokemonTypes,
  PokemonPhysicalDetails,
  PokemonStats,
  CustomCard,
} from "../../components/pokemon";
import { fetchPokemon } from "../../utils/api";
import type { PokemonDetail } from "../../interfaces/PokemonDetail";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const getPokemon = async () => {
      try {
        const data = await fetchPokemon(id);
        setPokemon(data);
      } catch (err) {
        setError("Failed to fetch Pokémon details");
        console.error(err);
        setTimeout(() => router.push("/"), 3000);
      } finally {
        setLoading(false);
      }
    };

    getPokemon();
  }, [id, router]);

  if (loading) return <CircularProgress style={{ display: "block", margin: "50vh auto" }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ my: 4 }}>
      {pokemon && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <PokemonImage
              image={pokemon.sprites.front_default}
              imageBack={pokemon.sprites.back_default}
              imageShiny={pokemon.sprites.front_shiny}
              name={pokemon.name}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomCard sx={{ height: "100%", p: 2 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                  {pokemon.name.toUpperCase()}
                </Typography>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                  <Grid size={{ xs: 6 }}>
                    <PokemonAbilities abilities={pokemon.abilities} />
                    <Box sx={{ my: 2 }} />
                    <PokemonTypes types={pokemon.types} />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <PokemonPhysicalDetails height={pokemon.height} weight={pokemon.weight} />
                  </Grid>
                </Grid>
              </CardContent>
            </CustomCard>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomCard>
              <CardContent>
                <PokemonStats stats={pokemon.stats} />
              </CardContent>
            </CustomCard>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomCard>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/pokemon/${Number(id) - 1}`)}
                    disabled={Number(id) === 1}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/pokemon/${Number(id) + 1}`)}
                    disabled={Number(id) === 1304}
                  >
                    Next
                  </Button>
                </Box>
              </CardContent>
            </CustomCard>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default PokemonDetail;