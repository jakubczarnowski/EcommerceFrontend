import { Grid, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProducts, selectStatus, selectError, fetchProducts, selectFavoriteProducts } from "../../reducers/productsSlice";
import ProductParamsI from "../../types/ProductParamI";
import { IDLE, LOADING, FULLFILLED, FAILED } from "../../utils/states";
import Product from "../Products/Product";

type Props = {};

const WishList = (props: Props) => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(selectFavoriteProducts);
	const productStatus = useAppSelector(selectStatus);
	const productError = useAppSelector(selectError);
	console.log(products);
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
			<Grid xs={4} sm={4} md={4} lg={4} key={product.id} item>
				<Product product={product} />
			</Grid>
		));
	} else if (productStatus === FAILED) {
		content = <p>{productError}</p>;
	}

	return (
		<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Grid container spacing={2} columns={{ xs: 4, sm: 8, lg: 12 }}>
				{content}
			</Grid>
		</Box>
	);
};

export default WishList;
