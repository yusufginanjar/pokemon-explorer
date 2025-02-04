import React from "react";
import { CustomCard } from "./CustomCard";
import { Box, Typography } from "@mui/material";

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