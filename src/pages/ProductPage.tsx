import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../app/hooks";
import { selectProductBySlug } from "../reducers/productsSlice";

function ProductPage() {
	const { slug } = useParams();
	const product = useAppSelector((state) => selectProductBySlug(state, slug || ""));
	console.log(product);
	return <div>{slug} omg</div>;
}

export default ProductPage;
