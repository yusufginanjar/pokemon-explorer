import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Container,
	TextField,
	Pagination,
} from "@mui/material";

interface Pokemon {
	name: string;
	url: string;
}

const Home = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState<string>("");
	const [executeSearch, setExecuteSearch] = useState<boolean>(false);

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

	const filteredPokemons = pokemons.filter((pokemon) =>
		pokemon.name.includes(search.toLowerCase())
	);

	return (
		<Container sx={{ mb: 4 }}>
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
					return (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<Link
								href={`/pokemon/${pokemonId}`}
								style={{ textDecoration: "none", color: "inherit" }}>
								<Card>
									<CardMedia
										title={pokemon.name}
										image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
										style={{
											paddingTop: "100%",
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "center",
										}}
									/>
									<CardContent>
										<Typography variant="h6">
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
