import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
	Container,
	Card,
	CardContent,
	Typography,
	CircularProgress,
	Box,
	LinearProgress,
	List,
	ListItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";

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

const CustomCard = styled(Card)(({ theme }) => ({
	borderRadius: theme.spacing(1),
	boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
}));

const CustomBox = styled(Box)(({ theme }) => ({
	border: "1px solid",
	borderRadius: theme.spacing(1),
	borderColor: "#e0e0e0",
	backgroundColor: "#f5f5f5",
	padding: theme.spacing(1),
	textAlign: "center",
}));

// Helper functions for unit conversion
const convertToMeter = (decimeter: number) => decimeter / 10;
const convertToKg = (hectogram: number) => hectogram / 10;

// Component to display Pokémon image
const PokemonImage = ({ image, name }: { image: string; name: string }) => (
	<CustomCard sx={{ height: "100%" }}>
		<img src={image} alt={name} style={{ width: "100%", height: "auto" }} />
	</CustomCard>
);

// Component to display Pokémon abilities
const PokemonAbilities = ({
	abilities,
}: {
	abilities: PokemonDetail["abilities"];
}) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom>
			Abilities
		</Typography>
		<List dense>
			{abilities.map((ability, index) => (
				<ListItem key={`ability-${index}`}>{ability.ability.name}</ListItem>
			))}
		</List>
	</Box>
);

// Component to display Pokémon types
const PokemonTypes = ({ types }: { types: PokemonDetail["types"] }) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom>
			Types
		</Typography>
		<List dense>
			{types.map((type, index) => (
				<ListItem key={`type-${index}`}>{type.type.name}</ListItem>
			))}
		</List>
	</Box>
);

// Component to display Pokémon height and weight
const PokemonPhysicalDetails = ({
	height,
	weight,
}: {
	height: number;
	weight: number;
}) => (
	<Box>
		<Typography variant="h6" gutterBottom align="center">
			Height
		</Typography>
		<CustomBox>
			<Typography>{convertToMeter(height)} m</Typography>
		</CustomBox>
		<Box sx={{ my: 2 }} />
		<Typography variant="h6" gutterBottom align="center">
			Weight
		</Typography>
		<CustomBox>
			<Typography>{convertToKg(weight)} kg</Typography>
		</CustomBox>
	</Box>
);

// Component to display Pokémon stats
const PokemonStats = ({ stats }: { stats: PokemonDetail["stats"] }) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom align="center">
			Stats
		</Typography>
		{stats.map((stat, index) => (
			<Box key={`stat-${index}`} sx={{ mb: 2 }}>
				<Box display="flex" justifyContent="space-between">
					<Typography variant="body1">{stat.stat.name}</Typography>
					<Typography variant="body1">{stat.base_stat}</Typography>
				</Box>
				<LinearProgress
					variant="determinate"
					color={stat.base_stat > 100 ? "warning" : "info"}
					value={stat.base_stat > 100 ? 100 : stat.base_stat}
					sx={{ height: 20, borderRadius: 5 }}
				/>
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

	if (loading)
		return (
			<CircularProgress
				style={{ display: "block", marginTop: "50vh", marginLeft: "50vw" }}
			/>
		);
	if (error) return <Typography color="error">{error}</Typography>;

	return (
		<Container sx={{ my: 4 }}>
			{pokemon && (
				<Grid container spacing={2}>
					{/* Pokémon Image */}
					<Grid size={{ xs: 12, md: 4 }}>
						<PokemonImage
							image={pokemon.sprites.front_default}
							name={pokemon.name}
						/>
					</Grid>

					{/* Pokémon Details */}
					<Grid size={{ xs: 12, md: 8 }}>
						<CustomCard sx={{ height: "100%", p: 2 }}>
							<CardContent>
								<Typography
									variant="h4"
									gutterBottom
									align="center"
									className="font-pokemon-hollow">
									{pokemon.name.toUpperCase()}
								</Typography>
								<Grid container spacing={2} sx={{ mt: 4 }}>
									<Grid size={6}>
										<PokemonAbilities abilities={pokemon.abilities} />
										<Box sx={{ my: 2 }} />
										<PokemonTypes types={pokemon.types} />
									</Grid>
									<Grid size={6}>
										<PokemonPhysicalDetails
											height={pokemon.height}
											weight={pokemon.weight}
										/>
									</Grid>
								</Grid>
							</CardContent>
						</CustomCard>
					</Grid>

					{/* Pokémon Stats */}
					<Grid size={12}>
						<CustomCard>
							<CardContent>
								<PokemonStats stats={pokemon.stats} />
							</CardContent>
						</CustomCard>
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default PokemonDetail;
