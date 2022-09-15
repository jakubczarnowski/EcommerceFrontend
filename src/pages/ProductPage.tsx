import { Avatar, Box, Button, Divider, Grid, Rating, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import productsSlice, { fetchProductBySlug, selectProductBySlug, selectProducts } from "../reducers/productsSlice";
import ProductI from "../types/ProductI";
import { IDLE } from "../utils/states";
import { BASE_URL } from "../utils/BaseUrl";
import { BASE_IMAGE_URL } from "../utils/BaseImageUrl";
import { addToCart, changeQuantity, selectCartItemByProductId } from "../reducers/cartSlice";
import { Remove, Add } from "@mui/icons-material";

function ProductPage() {
	const { slug } = useParams();
	const dispatch = useAppDispatch();
	const [selectedProductUrl, setSelectedProductUrl] = useState(0);
	const product = useAppSelector((state) => selectProductBySlug(state, slug || ""));
	const cartItem = useAppSelector((state) => selectCartItemByProductId(state, product?.id || 0));

	useEffect(() => {
		dispatch(fetchProductBySlug(slug || ""));
	}, [slug]);
	if (product === undefined) {
		return <p>Loading</p>;
	}
	const existsInCart = cartItem !== undefined;
	return (
		<Box sx={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "primary.main", overflow: "hidden" }}>
			<Grid container maxWidth="lg" columns={12} sx={{ paddingTop: "24px", marginBottom: "16px" }}>
				<Grid item xs={12} md={6} sx={{ paddingX: "24px", alignItems: "center", flexDirection: "column", display: "flex" }}>
					<Box>
						<img src={BASE_IMAGE_URL + product.imagesUrl[selectedProductUrl]} style={{ objectFit: "contain", height: "350px", width: "350px" }} alt={"Main Image"} />
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: "10px" }}>
						<Box onClick={() => setSelectedProductUrl(0)} sx={{ border: "1px solid", borderColor: [selectedProductUrl === 0 ? "secondary.main" : "primary.light"], borderRadius: "10px", width: "64px", height: "64px", display: "flex", justifyContent: "center", alignItems: "center" }}>
							<Avatar sx={{ height: "40px" }} variant="square">
								<img src={BASE_IMAGE_URL + product.imagesUrl[0]} alt="" style={{ width: "inherit", height: "inherit", objectFit: "fill" }} />
							</Avatar>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h1" sx={{ fontSize: "30px", fontWeight: "600", marginBottom: "20px" }}>
						{product.name}
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
						<span>Ratings:</span>
						<Rating value={3} readOnly size="small" sx={{ marginX: "5px" }} />
						<span>(19)</span>
					</Box>
					<Box sx={{ marginBottom: "20px" }}>
						<Typography variant="h2" sx={{ fontSize: "25px", fontWeight: "600", color: "secondary.main", marginBottom: "15x" }}>
							${product.price.toFixed(2)}
						</Typography>
						<span>Stock available</span>
					</Box>
					<Box>
						{existsInCart ? (
							<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: "0px" }}>
								<Button sx={{ border: "1px solid", aspectRatio: "1/1", minWidth: "0px", minHeight: "0px", padding: "5px" }} color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItem.id, quantity: cartItem.quantity - 1 }))}>
									<Remove fontSize="small" color={"secondary"} />
								</Button>
								<Typography variant="subtitle2" sx={{ fontSize: "15px", marginX: "15px" }}>
									{cartItem.quantity}
								</Typography>

								<Button sx={{ border: "1px solid", aspectRatio: "1/1", minWidth: "0px", minHeight: "0px", padding: "5px" }} color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 }))}>
									<Add fontSize="small" color="secondary" />
								</Button>
							</Box>
						) : (
							<Button variant="contained" color="secondary" onClick={(e) => dispatch(addToCart({ productId: product.id, quantity: 1 }))}>
								Add To Cart
							</Button>
						)}
					</Box>
				</Grid>
			</Grid>

			<Divider />
		</Box>
	);
}

export default ProductPage;
