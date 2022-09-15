import { AccountBox, KeyboardArrowDown, Search, TextFormatOutlined, TextFormatRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Input, Menu, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { selectCategories, selectCategoryById, selectCategoryStatus } from "../../reducers/categorySlice";
import CategoryI from "../../types/CategoryI";
import { FULLFILLED, IDLE } from "../../utils/states";

type Props = {};

const SearchField = (props: Props) => {
	const [categoriesAnchor, setCategoriesAnchor] = React.useState<null | HTMLElement>(null);
	const categoriesDropdownOpen = Boolean(categoriesAnchor);
	const [categoryId, setCategoryId] = React.useState(0);
	const categories = useAppSelector(selectCategories) || ({} as CategoryI);
	const selectedCategory = useAppSelector((state: RootState) => selectCategoryById(state, categoryId)) || ({} as CategoryI);
	const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
		setCategoriesAnchor(event.currentTarget);
	};
	const handleDropdownClose = () => {
		setCategoriesAnchor(null);
	};
	const renderCategoriesDropdown = (
		<Menu
			anchorEl={categoriesAnchor}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "left",
			}}
			open={categoriesDropdownOpen}
			onClose={handleDropdownClose}
		>
			<MenuItem
				onClick={() => {
					setCategoryId(0);
					handleDropdownClose();
				}}
			>
				<Typography variant="body1">All Categories</Typography>
			</MenuItem>
			{categories.categoryChildren?.map((category) => (
				<MenuItem
					key={category.id}
					onClick={() => {
						setCategoryId(category.id);
						handleDropdownClose();
					}}
				>
					<Typography variant="body1">{category.categoryName}</Typography>
				</MenuItem>
			)) || ""}
		</Menu>
	);
	return (
		<Box
			onSubmit={(e: any) => {
				e.preventDefault();
				console.log(e);
			}}
			component="form"
			sx={{ border: "1px solid", borderColor: "primary.light", width: "100%", height: "44px", display: "flex", flexDirection: "row", borderRadius: "20px", padding: "2px", alignItems: "center", gap: "5px", overflow: "hidden" }}
		>
			<Search sx={{ marginX: "10px" }} />
			<TextField placeholder="Search..." sx={{ width: "100%" }} variant="standard" focused></TextField>
			<Button onClick={(e) => handleDropdownOpen(e)} sx={{ borderLeft: "1px solid #DAE1E7", bgcolor: "background.default", height: "100%", color: "primary.dark", paddingX: "24px", textTransform: "none", whiteSpace: "nowrap" }}>
				{categoryId === 0 ? "All Categories" : selectedCategory?.categoryName}
				<KeyboardArrowDown />
			</Button>
			{renderCategoriesDropdown}
		</Box>
	);
};

export default SearchField;
