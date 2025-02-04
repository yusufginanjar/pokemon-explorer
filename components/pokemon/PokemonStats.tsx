import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { PokemonDetail } from "../../interfaces/PokemonDetail";
import { convertSlugToName } from "../../utils/converts";

interface PokemonStatsProps {
	stats: PokemonDetail["stats"];
}
export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="h6" gutterBottom color="primary" align="center">
				Stats
			</Typography>

			{stats.map((stat, index) => (
				<Box key={`stat-${index}`} sx={{ mb: 2 }}>
					<Box display="flex" justifyContent="space-between">
						<Typography variant="body1">
							{convertSlugToName(stat.stat.name)}
						</Typography>
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
};
