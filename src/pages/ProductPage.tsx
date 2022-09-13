import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../app/hooks";
import { selectProductBySlug } from "../reducers/productsSlice";
import ImageGallery from "react-image-gallery";

function ProductPage() {
	const { slug } = useParams();
	const product = useAppSelector((state) => selectProductBySlug(state, slug || ""));

	const images = [
		product?.imagesUrl.forEach((val) => {
			return {
				original: val,
			};
		}),
	];
	console.log(images);

	return (
		<Container maxWidth="lg">
			<Grid spacing={0} columns={12}>
				<Grid item xs={12} md={6}></Grid>
				<Grid item xs={12} md={6}></Grid>
			</Grid>
		</Container>
	);
}

export default ProductPage;
