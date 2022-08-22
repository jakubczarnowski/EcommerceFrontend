import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Product from "../components/Products/Product";
import { fetchProducts, selectError, selectProducts, selectStatus } from "../reducers/productsSlice";
import "../static/styles.css";
import ProductParamsI from "../types/ProductParamI";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
function HomePage() {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectProducts);
	const productStatus = useAppSelector(selectStatus);
	const productError = useAppSelector(selectError);

	const fetchConfig: ProductParamsI = {
		size: 30,
		page: 1,
	};

	useEffect(() => {
		if (productStatus === IDLE) {
			dispatch(fetchProducts(fetchConfig));
		}
	}, [dispatch]);

	let content: JSX.Element | JSX.Element[] = <p>Idle</p>;

	if (productStatus === LOADING) {
		content = <p>Loading</p>;
	} else if (productStatus === FULLFILLED) {
		content = products.map((product) => (
			<Grid xs={2} sm={4} md={3} key={product.id} item>
				<Product product={product} />
			</Grid>
		));
	} else if (productStatus === FAILED) {
		content = <p>{productError}</p>;
	}

	return (
		<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
			{content}
		</Grid>
	);
}

export default HomePage;
