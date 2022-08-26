import { ShoppingBagOutlined } from "@mui/icons-material";
import { Button, Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCart, selectCart, selectCartStatus } from "../../reducers/cartSlice";
import { CalculateTotalCost } from "../../utils/CalculateTotalCost";
import { IDLE } from "../../utils/states";
import CartItem from "./CartItem";

type Props = {
	open: boolean;
	onClose: () => void;
};

const CartDrawer = ({ open, onClose }: Props) => {
	const navigate = useNavigate();
	const cart = useAppSelector(selectCart);
	const status = useAppSelector(selectCartStatus);
	const anchor = "right";
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (status === IDLE) {
			dispatch(fetchCart());
		}
	}, []);
	return (
		<Drawer sx={{ zIndex: 1204, display: "flex", flexDirection: "column" }} anchor={anchor} open={open} onClose={() => onClose()}>
			<Box sx={{ width: "380px" }}>
				<Box sx={{ height: "calc((100vh- 80px) - 3.25rem)" }}>
					<Box sx={{ display: "flex", alignItems: "center", marginX: "20px", height: "74px" }}>
						<ShoppingBagOutlined />
						<Typography variant="h6" sx={{ fontSize: "16px", marginLeft: "8px" }}>
							{cart.cartItems.length} items
						</Typography>
					</Box>
					<Divider />
					{cart.cartItems != undefined
						? cart.cartItems.map((cartItem) => {
								return <CartItem key={cartItem.id} cartItemId={cartItem.id} product={cartItem.product} quantity={cartItem.quantity} />;
						  })
						: ""}
				</Box>
			</Box>
			<Box sx={{ padding: "20px", marginTop: "auto" }}>
				<Button color="secondary" onClick={() => navigate("/checkout")} variant="contained" sx={{ width: "100%", textTransform: "none" }}>
					Checkout now (${CalculateTotalCost(cart.cartItems)})
				</Button>
				<Button
					onClick={() => {
						navigate("/cart");
						onClose();
					}}
					color="secondary"
					variant="outlined"
					sx={{ width: "100%", textTransform: "none", marginY: "10px" }}
				>
					View Cart
				</Button>
			</Box>
		</Drawer>
	);
};

export default CartDrawer;
