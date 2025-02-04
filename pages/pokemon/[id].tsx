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
	Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import { Source } from "@mui/icons-material";

// Interface for Pokémon details
interface PokemonDetail {
	name: string;
	sprites: {
		back_default: string;
		front_default: string;
		front_shiny: string;
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

const onMouseEnter = (source: string) => {
	const image = document.getElementById(`main-image`) as HTMLImageElement;
	if (image) {
		image.src = source;
	}
};

// Component to display Pokémon image
const PokemonImage = ({
	image,
	imageBack,
	imageShiny,
	name,
}: {
	image: string;
	imageBack: string;
	imageShiny: string;
	name: string;
}) => (
	<CustomCard sx={{ height: "100%" }}>
		{image ? (
			<img
				id="main-image"
				src={image}
				alt={name}
				style={{ width: "100%", height: "auto" }}
			/>
		) : (
			<Typography variant="h6" align="center" color="error">
				No image available
			</Typography>
		)}
		<Box display="flex" justifyContent="space-between" sx={{ mt: "-100px" }}>
			{image && (
				<img
					src={image}
					alt={name}
					style={{ width: "30%", height: "auto" }}
					onMouseEnter={() => onMouseEnter(image)}
				/>
			)}
			{imageBack && (
				<img
					src={imageBack}
					alt={name}
					style={{ width: "30%", height: "auto" }}
					onMouseEnter={() => onMouseEnter(imageBack)}
				/>
			)}
			{imageShiny && (
				<img
					src={imageShiny}
					alt={name}
					style={{ width: "30%", height: "auto" }}
					onMouseEnter={() => onMouseEnter(imageShiny)}
				/>
			)}
		</Box>
	</CustomCard>
);

// Component to display Pokémon abilities
const PokemonAbilities = ({
	abilities,
}: {
	abilities: PokemonDetail["abilities"];
}) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom color="primary">
			Abilities
		</Typography>
		<List dense>
			{abilities.map((ability, index) => (
				<ListItem key={`ability-${index}`}>
					&#8226; {ability.ability.name}
				</ListItem>
			))}
		</List>
	</Box>
);

// Component to display Pokémon types
const PokemonTypes = ({ types }: { types: PokemonDetail["types"] }) => (
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

// Component to display Pokémon height and weight
const PokemonPhysicalDetails = ({
	height,
	weight,
}: {
	height: number;
	weight: number;
}) => (
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

// Component to display Pokémon stats
const PokemonStats = ({ stats }: { stats: PokemonDetail["stats"] }) => (
	<Box display="flex" flexDirection="column">
		<Typography variant="h6" gutterBottom align="center" color="primary">
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
				setTimeout(() => router.push("/"), 3000);
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
							imageBack={pokemon.sprites.back_default}
							imageShiny={pokemon.sprites.front_shiny}
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
									className="font-pokemon-hollow"
									color="warning">
									Pokémon Details #{id}
								</Typography>
								<Typography
									variant="h4"
									gutterBottom
									align="center"
									color="primary">
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
										<Box sx={{ my: 2 }} />
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
					{/* Pokémon Next and Prev */}
					<Grid size={12}>
						<CustomCard>
							<CardContent>
								<Box display="flex" justifyContent="space-between">
									<Button
										variant="contained"
										color="primary"
										onClick={() => router.push(`/pokemon/${Number(id) - 1}`)}
										disabled={Number(id) === 1}>
										<Typography variant="h6" align="center" color="white">
											Prev
										</Typography>
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={() => router.push(`/pokemon/${Number(id) + 1}`)}
										disabled={Number(id) === 1304}>
										<Typography variant="h6" align="center" color="white">
											Next
										</Typography>
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
