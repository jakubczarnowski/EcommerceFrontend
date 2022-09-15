import { Add, AddCircleOutlineOutlined, Clear, Delete, Remove, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { changeQuantity } from "../../reducers/cartSlice";
import ProductI from "../../types/ProductI";
import { BASE_IMAGE_URL } from "../../utils/BaseImageUrl";

type Props = {
	product: ProductI;
	quantity: number;
	cartItemId: number;
};

const CartPageItem = ({ product, quantity, cartItemId }: Props) => {
	const dispatch = useAppDispatch();
	return (
		<Paper elevation={4} sx={{ display: "flex", borderRadius: "10px", marginY: "20px", width: "100%", paddingX: "10px" }}>
			<Avatar sx={{ width: "156px", height: "156px", borderRadius: "10px" }} variant="square">
				<img style={{ width: "156px", height: "156px", objectFit: "cover", aspectRatio: "1/1" }} src={BASE_IMAGE_URL + product.imagesUrl[0]} alt={product.name} />
			</Avatar>
			<Box sx={{ display: "flex", flexDirection: "column", rowGap: "16px", marginY: "16px" }}>
				<Link to={"/product/" + product.slug}>
					<Typography variant="h6" sx={{ fontSize: "18px", fontWeight: "500", textTransform: "capitalize", marginX: "10px" }}>
						{product.name}
					</Typography>
				</Link>

				<Box sx={{ display: "flex", gap: "8px", alignItems: "center", marginX: "10px" }}>
					<Typography sx={{ color: "primary.gray", fontWeight: "300" }}>
						${product.price} x {quantity}
					</Typography>
					<Typography sx={{ color: "secondary.main", fontWeight: "450", fontSize: "15px" }}>${product.price * quantity}</Typography>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: "0px" }}>
					<Button sx={{ border: "1px solid", aspectRatio: "1/1", marginX: "10px", minWidth: "0px", minHeight: "0px", padding: "5px" }} color="secondary" disabled={quantity === 1} onClick={() => dispatch(changeQuantity({ id: cartItemId, quantity: quantity - 1 }))}>
						<Remove fontSize="small" color={quantity === 1 ? "disabled" : "secondary"} />
					</Button>
					<Typography variant="subtitle2" sx={{ fontSize: "15px" }}>
						{quantity}
					</Typography>

					<Button sx={{ border: "1px solid", aspectRatio: "1/1", marginX: "10px", minWidth: "0px", minHeight: "0px", padding: "5px" }} color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItemId, quantity: quantity + 1 }))}>
						<Add fontSize="small" color="secondary" />
					</Button>
				</Box>
			</Box>
			<IconButton sx={{ marginLeft: "auto", marginBottom: "auto" }} onClick={() => dispatch(changeQuantity({ id: cartItemId, quantity: 0 }))} color="secondary">
				<Clear color="disabled" />
			</IconButton>
		</Paper>
	);
};

export default CartPageItem;
