import { LocationOn, Person, ShoppingBagOutlined } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

type Props = {};

const Dashboard = (props: Props) => {
	const [selectedPage, setSelectedPage] = useState("");
	const handleClick = (name: string) => {
		setSelectedPage(name);
	};
	const orderCount = useAppDispatch();
	return (
		<Paper sx={{ padding: "24px" }} elevation={1}>
			<Typography color="primary.gray" variant="body1" sx={{ fontSize: "14px", marginBottom: "10px" }}>
				DASHBOARD
			</Typography>
			<Link to="/profile/orders" onClick={() => handleClick("orders")}>
				<Box sx={{ display: "flex", alignItems: "center", marginY: "1rem", borderLeft: selectedPage == "orders" ? "4px solid #d23f57" : "" }}>
					<ShoppingBagOutlined color={selectedPage == "orders" ? "secondary" : "inherit"} fontSize="small" />
					<Typography variant="body2" sx={{ color: selectedPage == "orders" ? "secondary.main" : "black" }}>
						Orders
					</Typography>
					<Typography variant="body2" sx={{ marginLeft: "auto" }}>
						5
					</Typography>
				</Box>
			</Link>
			<Link to="/profile/wishlist" onClick={() => handleClick("wishlist")}>
				<Box sx={{ display: "flex", alignItems: "center", marginY: "1rem", borderLeft: selectedPage == "wishlist" ? "4px solid #d23f57" : "" }}>
					<ShoppingBagOutlined color={selectedPage == "wishlist" ? "secondary" : "inherit"} fontSize="small" />
					<Typography variant="body2" sx={{ color: selectedPage == "wishlist" ? "secondary.main" : "black" }}>
						Wishlist
					</Typography>
					<Typography variant="body2" sx={{ marginLeft: "auto" }}>
						5
					</Typography>
				</Box>
			</Link>
			<Typography color="primary.gray" variant="body1" sx={{ fontSize: "14px", marginToY: "20px 10px" }}>
				DASHBOARD
			</Typography>
			<Link to="/profile" onClick={() => handleClick("profile")}>
				<Box sx={{ display: "flex", alignItems: "center", marginY: "1rem", borderLeft: selectedPage == "profile" ? "4px solid #d23f57" : "" }}>
					<Person color={selectedPage == "profile" ? "secondary" : "inherit"} fontSize="small" />
					<Typography variant="body2" sx={{ color: selectedPage == "profile" ? "secondary.main" : "black" }}>
						Profile info
					</Typography>
				</Box>
			</Link>
			<Link to="/profile/addresses" onClick={() => handleClick("addresses")}>
				<Box sx={{ display: "flex", alignItems: "center", marginY: "1rem", borderLeft: selectedPage == "addresses" ? "4px solid #d23f57" : "" }}>
					<LocationOn color={selectedPage == "addresses" ? "secondary" : "inherit"} fontSize="small" />
					<Typography variant="body2" sx={{ color: selectedPage == "addresses" ? "secondary.main" : "black" }}>
						Addresses
					</Typography>
					<Typography variant="body2" sx={{ marginLeft: "auto" }}>
						5
					</Typography>
				</Box>
			</Link>
		</Paper>
	);
};

export default Dashboard;
