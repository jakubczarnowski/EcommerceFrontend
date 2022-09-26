import { AccountBox, KeyboardArrowDown, Search, TextFormatOutlined, TextFormatRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Input, Menu, MenuItem, TextField, Typography } from "@mui/material";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { selectCategories, selectCategoryById, selectCategoryStatus } from "../../reducers/categorySlice";
// import { selectSearch, updateSearch, updateSelectedCategory } from "../../reducers/searchSlice";
import CategoryI from "../../types/CategoryI";
import { FULLFILLED, IDLE } from "../../utils/states";

type Props = {};

const SearchField = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [categoryId, setCategoryId] = useState(1);
	const categories = useAppSelector(selectCategories) || ({} as CategoryI);
	// TODO optimize
	const selectedCategory = useAppSelector((state: RootState) => selectCategoryById(state, categoryId)) || ({} as CategoryI);

	const [search, setSearch] = useState("");

	const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(null);
	const categoriesDropdownOpen = Boolean(categoriesAnchor);

	const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
		setCategoriesAnchor(event.currentTarget);
	};

	const handleDropdownClose = () => {
		setCategoriesAnchor(null);
	};

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let params = new URLSearchParams();
		params.set("value", search);
		params.set("categoryId", categoryId.toString());
		navigate("/search?" + params.toString());
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
					setCategoryId(1);
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
		<Box onSubmit={handleSearch} component="form" sx={{ border: "1px solid", borderColor: "primary.light", width: "100%", height: "44px", display: "flex", flexDirection: "row", borderRadius: "20px", padding: "2px", alignItems: "center", gap: "5px", overflow: "hidden" }}>
			<Search sx={{ marginX: "10px" }} />
			<TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." sx={{ width: "100%" }} variant="standard" focused></TextField>
			<Button onClick={(e) => handleDropdownOpen(e)} sx={{ borderLeft: "1px solid #DAE1E7", bgcolor: "background.default", height: "100%", color: "primary.dark", paddingX: "24px", textTransform: "none", whiteSpace: "nowrap" }}>
				{categoryId === 1 ? "All Categories" : selectedCategory?.categoryName}
				<KeyboardArrowDown />
			</Button>
			{renderCategoriesDropdown}
		</Box>
	);
};

export default SearchField;
