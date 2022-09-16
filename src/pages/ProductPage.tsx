import { Avatar, Box, Button, Divider, Grid, Rating, Select, Tab, Tabs, Typography } from "@mui/material";
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
import Review from "../components/Products/Review";
import ReviewForm from "../components/Products/ReviewForm";

function ProductPage() {
	const { slug } = useParams();
	const dispatch = useAppDispatch();
	const [selectedProductUrl, setSelectedProductUrl] = useState(0);
	const product = useAppSelector((state) => selectProductBySlug(state, slug || ""));
	const cartItem = useAppSelector((state) => selectCartItemByProductId(state, product?.id || 0));
	const [tabValue, setTabValue] = useState(0);
	useEffect(() => {
		dispatch(fetchProductBySlug(slug || ""));
	}, [slug]);
	if (product === undefined) {
		return <p>Loading</p>;
	}
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};
	const existsInCart = cartItem !== undefined;
	return (
		<Box sx={{ width: "100%", height: "auto", position: "sticky", backgroundColor: "primary.main", overflow: "hidden" }}>
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
			<Container maxWidth="lg">
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs indicatorColor="secondary" textColor="secondary" value={tabValue} onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Description" sx={{ textTransform: "none" }} id="description" aria-controls="description" />
						<Tab label="Reviews (19)" sx={{ textTransform: "none" }} id="review" aria-controls="review" />
					</Tabs>
				</Box>
				<Box id="description" aria-labelledby={`description`} hidden={tabValue !== 0} sx={{ margin: "16px" }}>
					<Typography variant="h3" sx={{ fontSize: "20px", fontWeight: "500", marginBottom: "16px" }}>
						Description:
					</Typography>
					<Typography variant="body2">{product.description}</Typography>
					<Typography variant="body2">{product.description}</Typography>
					<Typography variant="body2">{product.description}</Typography>
					<Typography variant="body2">{product.description}</Typography>
					<Typography variant="body2">Brand: Beats Model: S450 Wireless Bluetooth Headset FM Frequency Response: 87.5 – 108 MHz Feature: FM Radio, Card Supported (Micro SD / TF) Made in China</Typography>
				</Box>
				<Box id="review" aria-labelledby={`review`} hidden={tabValue !== 1} sx={{ margin: "20px" }}>
					<Review name="John Doe" rating={3} timePosted={new Date()} message={"Japierdole ale chujowe nie moge kurwa wytrzymac z tym syfem jebanym tnie sie jak skurwysyn no ja pierdole nie wytrzymam kurwa"} />
					<Review name="John Doe" rating={3} timePosted={new Date()} message={"Japierdole ale chujowe nie moge kurwa wytrzymac z tym syfem jebanym tnie sie jak skurwysyn no ja pierdole nie wytrzymam kurwa"} />
					<ReviewForm />
				</Box>
			</Container>
		</Box>
	);
}

export default ProductPage;
