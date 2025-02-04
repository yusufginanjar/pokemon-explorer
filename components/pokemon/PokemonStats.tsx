import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { PokemonDetail } from "../../interfaces/PokemonDetail";

interface PokemonStatsProps {
    stats: PokemonDetail["stats"];
    }                                       
export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="h6" gutterBottom color="primary">
                Stats
            </Typography>
            <List dense>
                {stats.map((stat, index) => (
                    <ListItem key={`stat-${index}`}>
                        {stat.stat.name}: {stat.base_stat}
                    </ListItem>
                ))}
            </List>
        </Box>

    );
}
