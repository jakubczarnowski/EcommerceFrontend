import { Box, Button, Chip, Divider, FormControl, FormHelperText, Grid, Input, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartItem from "../components/cart/CartItem";
import CartPageItem from "../components/cart/CartPageItem";
import { selectCart } from "../reducers/cartSlice";
import { CalculateTotalCost } from "../utils/CalculateTotalCost";

type Props = {};

const CartPage = (props: Props) => {
	const cart = useAppSelector(selectCart);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<Container maxWidth="lg" sx={{ margin: "32px auto", paddingX: "24px" }}>
			<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
				<Chip label="1. Cart" variant="filled" color="secondary" sx={{ width: "100px", fontSize: "14px" }} />
				<Box sx={{ width: "50px", height: "3px", backgroundColor: "primary.gray", opacity: "0.5" }}></Box>
				<Chip label="2. Payment and delivery" variant="outlined" color="secondary" sx={{ fontSize: "14px" }} />
				<Box sx={{ width: "50px", height: "3px", backgroundColor: "primary.gray", opacity: "0.5" }}></Box>
				<Chip label="3. Review" variant="outlined" color="secondary" sx={{ width: "100px", fontSize: "14px" }} />
			</Box>
			<Box sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "50px" }}>
				<Box sx={{ minWidth: { md: "66.66%", sm: "100%", xs: "100%" } }}>
					{cart.cartItems.map((item) => {
						return <CartPageItem product={item.product} quantity={item.quantity} cartItemId={item.id} key={item.id} />;
					})}
				</Box>
				<Box sx={{ flexGrow: "2", marginY: "20px" }}>
					<Paper elevation={1} sx={{ padding: "24px" }}>
						<Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
							<Typography component="span" color="primary.dark">
								Total:
							</Typography>
							<Typography component="span" sx={{ fontWeight: "500" }}>
								${CalculateTotalCost(cart.cartItems)}
							</Typography>
						</Box>
						<Divider />
						<Box sx={{ flexGrow: "1", marginY: "30px" }}>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Typography component="span" sx={{ fontWeight: "500" }}>
									Aditional Comments
								</Typography>
								<Box sx={{ backgroundColor: "rgb(252, 233, 236)", padding: "6px 10px", fontSize: "12px", color: "secondary.main", borderRadius: "5px", marginX: "5px" }}>Note</Box>
							</Box>
							<FormControl fullWidth>
								<OutlinedInput color="secondary" id="notes" aria-describedby="notes" multiline minRows={3} />
							</FormControl>
						</Box>
						<Button color="secondary" onClick={() => navigate("/checkout")} variant="contained" sx={{ width: "100%", textTransform: "none" }}>
							Checkout now
						</Button>
					</Paper>
				</Box>
			</Box>
		</Container>
	);
};

export default CartPage;
