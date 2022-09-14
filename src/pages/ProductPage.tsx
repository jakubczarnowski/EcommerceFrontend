import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProductBySlug, selectProductBySlug, selectProducts } from "../reducers/productsSlice";
import ImageGallery from "react-image-gallery";
import ProductI from "../types/ProductI";
import { IDLE } from "../utils/states";
import { BASE_URL } from "../utils/BaseUrl";
import { BASE_IMAGE_URL } from "../utils/BaseImageUrl";

function ProductPage() {
	const { slug } = useParams();
	const dispatch = useAppDispatch();
	const product = useAppSelector((state) => selectProductBySlug(state, slug || ""));
	const images: { original: string }[] = [];
	useEffect(() => {
		dispatch(fetchProductBySlug(slug || ""));
	}, [slug]);
	if (product === undefined) {
		return <p>Loading</p>;
	}
	product.imagesUrl.forEach((image) => images.push({ original: BASE_IMAGE_URL + image }));
	return (
		<Box sx={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "primary.main", overflow: "hidden" }}>
			<Container maxWidth="lg">
				<Grid columns={12}>
					<Grid item xs={12} md={6}>
						<ImageGallery items={images} />
					</Grid>
					<Grid item xs={12} md={6}></Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default ProductPage;
