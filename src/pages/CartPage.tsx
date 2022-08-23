import { Box, Chip, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartItem from "../components/cart/CartItem";
import CartPageItem from "../components/cart/CartPageItem";
import { selectCart } from "../reducers/cartSlice";

type Props = {};

const CartPage = (props: Props) => {
	const cart = useAppSelector(selectCart);
	const dispatch = useAppDispatch();

	return (
		<Container maxWidth="lg" sx={{ margin: "32px auto", paddingX: "24px", width: "100%" }}>
			<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
				<Chip label="1. Cart" variant="filled" color="secondary" sx={{ width: "100px", fontSize: "14px" }} />
				<Box sx={{ width: "50px", height: "3px", backgroundColor: "primary.gray", opacity: "0.5" }}></Box>
				<Chip label="2. Payment and delivery" variant="outlined" color="secondary" sx={{ fontSize: "14px" }} />
				<Box sx={{ width: "50px", height: "3px", backgroundColor: "primary.gray", opacity: "0.5" }}></Box>
				<Chip label="3. Review" variant="outlined" color="secondary" sx={{ width: "100px", fontSize: "14px" }} />
			</Box>
			<Box sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "row" }}>
				<Box sx={{ minWidth: "66%" }}>
					{cart.cartItems.map((item) => {
						return <CartPageItem product={item.product} quantity={item.quantity} cartItemId={item.id} key={item.id} />;
					})}
				</Box>
			</Box>
		</Container>
	);
};

export default CartPage;
