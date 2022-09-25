import { ArrowForward, Category, KeyboardArrowDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Container, Grid, MenuItem, Select, styled, Typography } from "@mui/material";
import { TypographyProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Product from "../components/Products/Product";
import { fetchProducts, selectError, selectProducts, selectStatus } from "../reducers/productsSlice";
import ProductParamsI from "../types/ProductParamI";
import ProductSort from "../types/SortE";
import { IDLE, LOADING, FULLFILLED, FAILED } from "../utils/states";
// import { selectSearch } from "../reducers/searchSlice";

type Props = {};
const CategoryText = (props: { children: string }) => <Typography sx={{ fontSize: "16px", color: "primary.blue", marginBottom: "8px" }}>{props.children}</Typography>;
const SearchPage = (props: Props) => {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("value");
	const categoryId = searchParams.get("categoryId");
	const [selectedSort, setSelectedSort] = useState<ProductSort>(ProductSort.RELEVANCE);

	const dispatch = useAppDispatch();
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
			<Grid lg={4} md={6} sm={6} xs={12} key={product.id} item>
				<Product product={product} />
			</Grid>
		));
	} else if (productStatus === FAILED) {
		content = <p>{productError}</p>;
	}
	return (
		<Container maxWidth="lg">
			<Card sx={{ padding: "15px", marginTop: "10px", flexDirection: "row", display: "flex" }}>
				<Box sx={{ display: "flex", flexDirection: "column", marginRight: "auto" }}>
					<Typography fontWeight={"500"} fontSize={"17px"}>
						Searching for: {search}
					</Typography>
					<Typography>48 results</Typography>
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
				<Grid item lg={3} md={3} sm={0}>
					<Card sx={{ display: "flex", flexDirection: "column", padding: "10px 20px" }}>
						<Typography fontSize={"15px"} fontWeight={"500"} marginY={"10px"}>
							Categories
						</Typography>
						<Box>
							<Accordion sx={{ boxShadow: "none" }} disableGutters expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
								<AccordionSummary sx={{ padding: "0", margin: "0" }} expandIcon={<KeyboardArrowDown sx={{ fontSize: "0.9rem" }} />}>
									<CategoryText>Drukarki</CategoryText>
								</AccordionSummary>
								<AccordionDetails sx={{ margin: 0, padding: 0, paddingLeft: "10px" }}>
									<CategoryText>Laserowe</CategoryText>
								</AccordionDetails>
							</Accordion>
							<CategoryText>Komputery</CategoryText>
						</Box>
					</Card>
				</Grid>
				<Grid item lg={9} md={9} xs={12}>
					<Grid container lg={12} spacing={3} sx={{ width: "100%" }}>
						{content}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default SearchPage;
