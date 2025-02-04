import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardMedia,
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
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const res = await axios.get(
					`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
				);
				setPokemons(res.data.results);
			} catch (err) {
				setError("Failed to fetch data");
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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	const filteredPokemons: Pokemon[] = pokemons.filter((pokemon: Pokemon) =>
		pokemon.name.toLowerCase().includes(search.toLowerCase())
	);

    const handleOnMouseEnter = ( pokemonId : number ) => (event: React.MouseEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement;
        target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`;
    }

    const handleOnMouseLeave = ( pokemonId : number ) => (event: React.MouseEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement;
        target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    }

	return (
		<Container sx={{ mb: "70px" }}>
			<Typography variant="h3" component="h1" gutterBottom>
				Pokemon List
			</Typography>
			<TextField
				label="Search Pokemon"
				variant="outlined"
				fullWidth
				margin="normal"
				onChange={handleSearch}
			/>
			<Grid container spacing={3}>
				{filteredPokemons.map((pokemon, index) => {
					const pokemonId = (page - 1) * 20 + index + 1;
					let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
					return (
						<Grid size={{ xs: 12, sm: 6, md: 3 }} key={pokemon.name}>
							<Link
								href={`/pokemon/${pokemonId}`}
								style={{ textDecoration: "none", color: "inherit" }}>
								<Box sx={{ position: "relative", top: "40px" }}>
									<img
                                        id={`pokemon-${pokemonId}`}
										src={imageUrl}
										alt={pokemon.name}
										style={{ width: "100%" }}
                                        onMouseEnter={handleOnMouseEnter(pokemonId)}
                                        onMouseLeave={handleOnMouseLeave(pokemonId)}
									/>
								</Box>
								<Card
									sx={{
										boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
										borderRadius: "10px",
                                        backgroundColor: "#f5f5f5",
									}}>
									<CardContent>
										<Typography variant="h6" align="center" sx={{ fontWeight: "800", color: "#333" }}>
											{pokemon.name.toUpperCase()}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					);
				})}
			</Grid>
			<Pagination
				count={10}
				page={page}
				onChange={handlePageChange}
				style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
			/>
		</Container>
	);
};

export default Home;
