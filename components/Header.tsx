import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Link from "next/link";

const ButtonAppBar: React.FC = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Container>
					<Link href="/" passHref>
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}>
								<img src="/pokeball.png" alt="Pokemon" width="40" height="40" />
							</IconButton>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Home
							</Typography>
						</Toolbar>
					</Link>
				</Container>
			</AppBar>
		</Box>
	);
};

export default ButtonAppBar;
