import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCategories, selectCategoryStatus } from "../../reducers/categorySlice";
import CategoryI from "../../types/CategoryI";
import ProductI from "../../types/ProductI";
import getCategoryChain from "../../utils/GetCategoryChain";
import ParseCategories from "../../utils/ParseCategories";
import { FULLFILLED } from "../../utils/states";

type Props = {
	product: ProductI;
};

const CategoryChain = ({ product }: Props) => {
	const categories = useAppSelector(selectCategories);
	const categoriesStatus = useAppSelector(selectCategoryStatus);
	let categoryChainElement = null;
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

	return categoryChainElement || <p>Loading</p>;
};

export default CategoryChain;
