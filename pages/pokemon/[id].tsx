import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
	Container,
	Card,
	CardMedia,
	CardContent,
	Typography,
	CircularProgress,
	Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Interface for Pokémon details
interface PokemonDetail {
	name: string;
	sprites: {
		front_default: string;
	};
	abilities: {
		ability: {
			name: string;
		};
	}[];
	height: number;
	weight: number;
	types: {
		type: {
			name: string;
		};
	}[];
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
}

// Helper functions for unit conversion
const convertToMeter = (decimeter: number) => decimeter / 10;
const convertToKg = (hectogram: number) => hectogram / 10;

// Component to display Pokémon image
const PokemonImage = ({ image, name }: { image: string; name: string }) => (
	<Card sx={{ height: "100%" }}>
		<CardMedia component="img" height="200" image={image} alt={name} />
	</Card>
);

// Component to display Pokémon abilities
const PokemonAbilities = ({ abilities }: { abilities: PokemonDetail["abilities"] }) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom>
			Abilities
		</Typography>
		{abilities.map((ability, index) => (
			<Typography key={`ability-${index}`}>{ability.ability.name}</Typography>
		))}
	</Box>
);

// Component to display Pokémon types
const PokemonTypes = ({ types }: { types: PokemonDetail["types"] }) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom>
			Types
		</Typography>
		{types.map((type, index) => (
			<Typography key={`type-${index}`}>{type.type.name}</Typography>
		))}
	</Box>
);

// Component to display Pokémon height and weight
const PokemonPhysicalDetails = ({ height, weight }: { height: number; weight: number }) => (
	<Box>
		<Typography variant="h6" gutterBottom>
			Height
		</Typography>
		<Typography>{convertToMeter(height)} m</Typography>
		<Typography variant="h6" gutterBottom>
			Weight
		</Typography>
		<Typography>{convertToKg(weight)} kg</Typography>
	</Box>
);

// Component to display Pokémon stats
const PokemonStats = ({ stats }: { stats: PokemonDetail["stats"] }) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom align="center">
			Stats
		</Typography>
		{stats.map((stat, index) => (
			<Box key={`stat-${index}`} display="flex" justifyContent="space-between">
				<Typography>{stat.stat.name}</Typography>
				<Typography>{stat.base_stat}</Typography>
			</Box>
		))}
	</Box>
);

// Main Pokémon detail component
const PokemonDetail = () => {
	const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (!id) return;

		const fetchPokemon = async () => {
			try {
				const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
				setPokemon(res.data);
			} catch (err) {
				setError("Failed to fetch Pokémon details");
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [id]);

	if (loading) return <CircularProgress style={{ display: "block", marginTop: "50vh", marginLeft: "50vw" }} />;
	if (error) return <Typography color="error">{error}</Typography>;

	return (
		<Container sx={{ my: 4 }}>
			{pokemon && (
				<Grid container spacing={2}>
					{/* Pokémon Image */}
					<Grid size={{ xs: 12, md: 4 }}>
						<PokemonImage image={pokemon.sprites.front_default} name={pokemon.name} />
					</Grid>

					{/* Pokémon Details */}
					<Grid size={{ xs: 12, md: 8 }}>
						<Card sx={{ height: "100%" }}>
							<CardContent>
								<Typography variant="h4" gutterBottom align="left">
									{pokemon.name.toUpperCase()}
								</Typography>
								<Grid container spacing={2}>
									<Grid size={6}>
										<PokemonAbilities abilities={pokemon.abilities} />
										<PokemonTypes types={pokemon.types} />
									</Grid>
									<Grid size={6}>
										<PokemonPhysicalDetails height={pokemon.height} weight={pokemon.weight} />
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>

					{/* Pokémon Stats */}
					<Grid size={12}>
						<Card>
							<CardContent>
								<PokemonStats stats={pokemon.stats} />
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default PokemonDetail;