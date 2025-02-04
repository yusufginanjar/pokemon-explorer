import React from "react";
import { CustomCard } from "./CustomCard";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface PokemonImageProps {
	image: string;
	imageBack: string;
	imageShiny: string;
	name: string;
}

const onMouseEnter = (source: string) => {
	const image = document.getElementById("main-image") as HTMLImageElement;
	if (image) {
		image.src = source;
	}
};

export const PokemonImage: React.FC<PokemonImageProps> = ({
	image,
	imageBack,
	imageShiny,
	name,
}) => (
	<CustomCard sx={{ height: "100%" }}>
		{image ? (
			<Box sx={{ height: "100%" }}>
				<Image
					id="main-image"
					src={image}
					alt={name}
					width={400}
					height={400}
				/>
			</Box>
		) : (
			<Typography variant="h6" align="center" color="error">
				No image available
			</Typography>
		)}
		<Box display="flex" justifyContent="space-between" sx={{ mt: "-100px" }}>
			{image && (
				<Image
					src={image}
					alt={name}
					width={100}
					height={100}
					onMouseEnter={() => onMouseEnter(image)}
				/>
			)}
			{imageBack && (
				<Box sx={{ width: "30%" }}>
					<Image
						src={imageBack}
						alt={name}
						width={100}
						height={100}
						onMouseEnter={() => onMouseEnter(imageBack)}
					/>
				</Box>
			)}
			{imageShiny && (
				<Box sx={{ width: "30%" }}>
					<Image
						src={imageShiny}
						alt={name}
						width={100}
						height={100}
						onMouseEnter={() => onMouseEnter(imageShiny)}
					/>
				</Box>
			)}
		</Box>
	</CustomCard>
);
