import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import { changeQuantity } from "../reducers/cartSlice";
import ProductI from "../types/ProductI";

type Props = { product: ProductI; quantity: number; cartItemId: number };

const QuantitySelector = ({ quantity, product, cartItemId }: Props) => {
	const dispatch = useAppDispatch();
	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<IconButton sx={{ border: "1px solid" }} color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItemId, quantity: quantity + 1 }))}>
				<Add fontSize="small" color="secondary" />
			</IconButton>
			<Typography variant="subtitle2" sx={{ fontSize: "15px" }}>
				{quantity}
			</Typography>
			<IconButton sx={{ border: "1px solid" }} color="secondary" disabled={quantity === 1} onClick={() => dispatch(changeQuantity({ id: cartItemId, quantity: quantity - 1 }))}>
				<Remove fontSize="small" color={quantity === 1 ? "disabled" : "secondary"} />
			</IconButton>
		</Box>
	);
};

export default QuantitySelector;
