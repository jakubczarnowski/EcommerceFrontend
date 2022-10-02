import { Avatar, Box, Button, Divider, Grid, Rating, Select, Tab, Tabs, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import productsSlice, { fetchProductBySlug, selectProductBySlug, selectProducts } from "../reducers/productsSlice";
import ProductI from "../types/ProductI";
import { FULLFILLED, IDLE, LOADING } from "../utils/states";
import { BASE_URL } from "../utils/BaseUrl";
import { BASE_IMAGE_URL } from "../utils/BaseImageUrl";
import { addToCart, changeQuantity, selectCartItemByProductId } from "../reducers/cartSlice";
import { Remove, Add } from "@mui/icons-material";
import Review from "../components/Products/Review";
import ReviewForm from "../components/Products/ReviewForm";
import { selectCategories, selectCategoryStatus } from "../reducers/categorySlice";
import ParseCategories from "../utils/ParseCategories";
import CategoryI from "../types/CategoryI";
import getCategoryChain from "../utils/GetCategoryChain";

function ProductPage() {
	const { slug } = useParams();
	const dispatch = useAppDispatch();
	const [selectedProductUrl, setSelectedProductUrl] = useState(0);
	const product = useAppSelector((state) => selectProductBySlug(state, slug || ""));
	const cartItem = useAppSelector((state) => selectCartItemByProductId(state, product?.id || 0));
	const categories = useAppSelector(selectCategories);
	const categoriesStatus = useAppSelector(selectCategoryStatus);
	let categoryChainElement = undefined;
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
	if (product === undefined) {
		return <p>Loading</p>;
	}
	if (categoriesStatus === FULLFILLED) {
		const parsedCategories = ParseCategories(categories || ({} as CategoryI));
		const categoryChain = getCategoryChain(parsedCategories, parsedCategories.find((c) => c.id === product?.categoryId) || ({} as CategoryI)).reverse();
		categoryChainElement = (
			<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
				{categoryChain.map((val, index) => {
					if (val.id == 1) {
						return (
							<Typography variant="body2" sx={{ fontSize: "12px", fontWeight: "500", marginBottom: "15px" }}>
								{"Bazar "} {index == categoryChain.length - 1 ? "" : "-->"}
							</Typography>
						);
					}
					return (
						<Typography variant="body2" sx={{ fontSize: "12px", fontWeight: "500", marginBottom: "15px" }}>
							{val.categoryName} {index == categoryChain.length - 1 ? "" : "-->"}
						</Typography>
					);
				})}
			</Box>
		);
	}
	return (
		<Box sx={{ width: "100%", height: "auto", position: "sticky", backgroundColor: "primary.main", overflow: "hidden" }}>
			<Grid container maxWidth="lg" columns={12} sx={{ paddingTop: "24px", marginBottom: "16px", marginX: " auto" }}>
				<Grid item xs={12} md={6} sx={{ paddingX: "24px", alignItems: "center", flexDirection: "column", display: "flex" }}>
					<Box>
						<img src={BASE_IMAGE_URL + product.imagesUrl[selectedProductUrl]} style={{ objectFit: "contain", height: "350px", width: "350px" }} alt={"Main Image"} />
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: "10px" }}>
						{product.imagesUrl.map((_, index) => {
							return (
								<Box key={index} onClick={() => setSelectedProductUrl(index)} sx={{ border: "1px solid", borderColor: [selectedProductUrl === index ? "secondary.main" : "primary.light"], borderRadius: "10px", width: "64px", height: "64px", display: "flex", justifyContent: "center", alignItems: "center" }}>
									<Avatar sx={{ height: "40px" }} variant="square">
										<img src={BASE_IMAGE_URL + product.imagesUrl[index]} alt="" style={{ width: "inherit", height: "inherit", objectFit: "fill" }} />
									</Avatar>
								</Box>
							);
						})}
					</Box>
				</Grid>
				<Grid item xs={12} md={6} sx={{ paddingLeft: "10px" }}>
					<Typography variant="h1" sx={{ fontSize: "30px", fontWeight: "600", marginBottom: "20px" }}>
						{product.name}
					</Typography>
					{categoryChainElement !== undefined ? categoryChainElement : <p>...</p>}
					<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
						<span>Ratings:</span>
						<Rating value={product.rating} readOnly size="small" sx={{ marginX: "5px" }} precision={0.25} />
						<span>({product.ratingCount})</span>
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
						<Tab label={`Reviews (${product.ratingCount})`} sx={{ textTransform: "none" }} id="review" aria-controls="review" />
					</Tabs>
				</Box>
				<Box id="description" aria-labelledby={`description`} hidden={tabValue !== 0} sx={{ margin: "16px" }}>
					<Typography variant="h3" sx={{ fontSize: "20px", fontWeight: "500", marginBottom: "16px" }}>
						Description:
					</Typography>
					<Typography variant="body2">{product.description}</Typography>
				</Box>
				<Box id="review" aria-labelledby={`review`} hidden={tabValue !== 1} sx={{ margin: "20px" }}>
					{product?.reviews?.map((review) => (
						<Review key={"review" + review?.id} name={review.name} rating={review.rating} timePosted={review.postDate} message={review.review} />
					))}
					<ReviewForm productId={product.id} />
				</Box>
			</Container>
		</Box>
	);
}

export default ProductPage;
