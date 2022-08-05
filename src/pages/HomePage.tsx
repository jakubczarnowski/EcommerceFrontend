import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../app/axiosInstance";
import { useAppDispatch } from "../app/hooks";
import Product from "../components/Products/Product";
import { fetchProducts, selectError, selectProducts, selectStatus } from "../reducers/productsSlice";
import "../static/styles.css";
import ProductParamsI from "../types/ProductParamI";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
function HomePage() {
	const dispatch = useAppDispatch();
	const products = useSelector(selectProducts);
	const productStatus = useSelector(selectStatus);
	const productError = useSelector(selectError);

	const fetchConfig: ProductParamsI = {
		size: 10,
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
		content = products.map((product) => <Product key={product.id} product={product} />);
	} else if (productStatus === FAILED) {
		content = <p>{productError}</p>;
	}

	return <div className={"productContainer"}>{content}</div>;
}

export default HomePage;
