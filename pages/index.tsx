import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
	Card,
	CardContent,
	Typography,
	Container,
	TextField,
	Pagination,
	Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Pokemon {
	name: string;
	url: string;
}

const Home: React.FC = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const res = await axios.get(
					`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
				);
				setPokemons(res.data.results);
				setTotalPages(Math.ceil(res.data.count / 20));
			} catch (err) {
				setError("Failed to fetch data");
				console.error(err); // Log error
			} finally {
				setLoading(false);
			}
		};

		fetchPokemons();
	}, [page]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const handleOnMouseEnter = (pokemonId: string) => () => {
		const target = document.getElementById(
			`pokemon-${pokemonId}`
		) as HTMLImageElement;
		target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`;
	};

	const handleOnMouseLeave = (pokemonId: string) => () => {
		const target = document.getElementById(
			`pokemon-${pokemonId}`
		) as HTMLImageElement;
		target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	const filteredPokemons: Pokemon[] = pokemons.filter((pokemon: Pokemon) =>
		pokemon.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Container sx={{ my: "70px" }}>
			<Typography
				variant="h3"
				component="h1"
				gutterBottom
				align="center"
				color="dark">
				Find your favorite Pokemon here!
			</Typography>
			<Grid container justifyContent="center">
				<Grid size={{ xs: 12, md: 6 }}>
					<TextField
						label="Search Pokemon"
						variant="outlined"
						fullWidth
						margin="normal"
						onChange={handleSearch}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				{filteredPokemons.map((pokemon) => {
					const pokemonId = pokemon.url.split("/").slice(-2)[0];
					const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
					return (
						<Grid size={{ xs: 12, sm: 6, md: 3 }} key={pokemon.name}>
							<Link
								href={`/pokemon/${pokemonId}`}
								style={{ textDecoration: "none", color: "inherit" }}>
								<Box sx={{ position: "relative", top: "40px" }}>
									<Image
										id={`pokemon-${pokemonId}`}
										src={imageUrl}
										alt={pokemon.name}
										width={200}
										height={200}
										onMouseEnter={handleOnMouseEnter(pokemonId)}
										onMouseLeave={handleOnMouseLeave(pokemonId)}
										style={{ width: "100%", height: "auto" }}
									/>
								</Box>
								<Card
									sx={{
										boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
										borderRadius: "10px",
										backgroundColor: "#f5f5f5",
									}}>
									<CardContent>
										<Typography variant="h6" align="center">
											{pokemon.name.toLowerCase()}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					);
				})}
			</Grid>
			<Pagination
				count={totalPages}
				page={page}
				onChange={handlePageChange}
				variant="outlined"
				style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
			/>
		</Container>
	);
};

export default Home;
