import { ArrowForward, ArrowUpward, Category, KeyboardArrowDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Container, Grid, IconButton, MenuItem, Select, styled, Typography } from "@mui/material";
import { TypographyProps } from "@mui/system";
import React, { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { JsxElement } from "typescript";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Product from "../components/Products/Product";
import { selectCategoryById } from "../reducers/categorySlice";
import { fetchProducts, selectError, selectProducts, selectStatus } from "../reducers/productsSlice";
import CategoryI from "../types/CategoryI";
import ProductParamsI from "../types/ProductParamI";
import ProductSort from "../types/SortE";
import { IDLE, LOADING, FULLFILLED, FAILED } from "../utils/states";
// import { selectSearch } from "../reducers/searchSlice";

type Props = {};
const CategoryText = (props: { children: string | ReactNode; categoryId: number }) => {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("value") || "";
	let params = new URLSearchParams();
	params.set("categoryId", props.categoryId.toString());
	params.set("value", search);
	return (
		<Link to={"/search?" + params.toString()}>
			<Typography sx={{ fontSize: "15px", color: "primary.blue", marginY: "10px" }}>{props.children}</Typography>
		</Link>
	);
};
const SearchPage = (props: Props) => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const search = searchParams.get("value") || "";
	const categoryId = Number.parseInt(searchParams.get("categoryId") || "0");
	const [selectedSort, setSelectedSort] = useState<ProductSort>(ProductSort.RELEVANCE);
	const category = useAppSelector((state) => selectCategoryById(state, categoryId));
	const parentCategory = useAppSelector((state) => selectCategoryById(state, category?.parentCategoryId || 1));
	const products = useAppSelector(selectProducts);
	const productStatus = useAppSelector(selectStatus);
	const productError = useAppSelector(selectError);
	const [expanded, setExpanded] = React.useState<string | false>("panel1");
	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};
	const fetchConfig: ProductParamsI = {
		size: 30,
		page: 1,
		search: search,
		categoryId: categoryId,
	};
	useEffect(() => {
		dispatch(fetchProducts(fetchConfig));
	}, [search, categoryId]);
	let content: JSX.Element | JSX.Element[] = <p>Idle</p>;
	if (productStatus === LOADING) {
		content = <p>Loading</p>;
	} else if (productStatus === FULLFILLED) {
		content = products.map((product) => (
			<Grid lg={4} md={6} sm={6} xs={12} key={product.id} item>
				<Product product={product} />
			</Grid>
		));
	} else if (productStatus === FAILED) {
		content = <p>{productError}</p>;
	}
	const showCategories = (category: CategoryI | undefined) => {
		return category?.categoryChildren.map((category) => {
			if (category.categoryChildren.length > 0) {
				return (
					<Accordion key={category.id} sx={{ boxShadow: "none", margin: "0px", minHeight: "0px" }} disableGutters expanded={expanded === "panel" + category.id} onChange={handleChange("panel" + category.id)}>
						<AccordionSummary sx={{ padding: "0px", margin: "0px" }} expandIcon={<KeyboardArrowDown sx={{ fontSize: "0.9rem" }} />}>
							<Typography sx={{ fontSize: "15px", color: "primary.blue", marginY: "5px" }}>{category.categoryName}</Typography>
						</AccordionSummary>
						<AccordionDetails sx={{ margin: 0, padding: 0, paddingLeft: "10px" }}>
							<CategoryText categoryId={category.id}>All Categories</CategoryText>
							{category.categoryChildren.map((category) => (
								<CategoryText key={category.id} categoryId={category.id}>
									{category.categoryName}
								</CategoryText>
							))}
						</AccordionDetails>
					</Accordion>
				);
			} else {
				return (
					<CategoryText key={category.id} categoryId={category.id}>
						{category.categoryName}
					</CategoryText>
				);
			}
		});
	};
	return (
		<Container maxWidth="lg">
			<Card sx={{ padding: "15px", marginTop: "10px", flexDirection: "row", display: "flex" }}>
				<Box sx={{ display: "flex", flexDirection: "column", marginRight: "auto" }}>
					<Typography fontWeight={"500"} fontSize={"17px"}>
						Searching for: {search}
					</Typography>
					<Typography>{products.length} results</Typography>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
					<Typography fontSize={"15px"} marginRight={"10px"}>
						Sort by:
					</Typography>
					<Select color="secondary" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value as ProductSort)} sx={{ height: "40px", width: "180px" }}>
						<MenuItem value={ProductSort.RELEVANCE}>Relevance</MenuItem>
						<MenuItem value={ProductSort.PRICE_ASCENDING}>Price Low to High</MenuItem>
						<MenuItem value={ProductSort.PRICE_DESCENDING}>Price High to Low </MenuItem>
					</Select>
				</Box>
			</Card>
			<Grid container sx={{ width: "100%", maxWidth: "1240px", marginTop: "30px" }}>
				<Grid item lg={3} md={3} sm={0} sx={{ display: { sm: "none", md: "block" } }}>
					<Card sx={{ display: "flex", flexDirection: "column", padding: "10px 20px" }}>
						<Box display="flex" flexDirection={"row"}>
							<Typography fontSize={"15px"} fontWeight={"500"} marginY={"10px"} marginRight="auto">
								Categories
							</Typography>
							<CategoryText categoryId={category?.parentCategoryId || 1}>
								<ArrowUpward />
							</CategoryText>
						</Box>

						<Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 1" }}>{category?.categoryChildren.length === 0 ? showCategories(parentCategory) : showCategories(category)}</Box>
					</Card>
				</Grid>
				<Grid item lg={9} md={9} xs={12}>
					<Grid container spacing={3} sx={{ width: "100%" }}>
						{content}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default SearchPage;
