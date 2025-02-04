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
	const imageBack = document.getElementById(
		"main-image-back"
	) as HTMLImageElement;
	const imageShiny = document.getElementById(
		"main-image-shiny"
	) as HTMLImageElement;

	if (source.includes("back")) {
		image.style.display = "none";
		imageBack.style.display = "block";
		imageShiny.style.display = "none";
	} else if (source.includes("shiny")) {
		image.style.display = "none";
		imageBack.style.display = "none";
		imageShiny.style.display = "block";
	} else {
		image.style.display = "block";
		imageBack.style.display = "none";
		imageShiny.style.display = "none";
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
				<Image
					id="main-image-back"
					src={imageBack}
					alt={name}
					width={400}
					height={400}
					style={{ display: "none" }}
				/>
				<Image
					id="main-image-shiny"
					src={imageShiny}
					alt={name}
					width={400}
					height={400}
					style={{ display: "none" }}
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
