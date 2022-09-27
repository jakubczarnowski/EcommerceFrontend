import { ShoppingBag } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

type Props = {};

const Addresses = (props: Props) => {
	return (
		<Box>
			<Paper elevation={0} sx={{ display: "flex", flexDirection: "row", padding: "5px", alignItems: "center", backgroundColor: "background.default" }}>
				<ShoppingBag color="secondary" />
				<Typography variant="h2" sx={{ fontSize: "25px", fontWeight: "bold", marginX: "12px" }}>
					My Addresses
				</Typography>
			</Paper>
		</Box>
	);
};

export default Addresses;
