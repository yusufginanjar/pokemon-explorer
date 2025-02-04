import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		onSearch(value);
	};

	return (
		<Box sx={{ mb: 4 }}>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Search Pokémon..."
				value={query}
				onChange={handleInputChange}
			/>
		</Box>
	);
};
