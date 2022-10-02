import { Typography, Toolbar, TextField, Button, Box, Select, SelectChangeEvent, MenuItem, FormControl, ImageList, ImageListItem, CardMedia } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCategory, fetchCategories, selectCategories } from "../../reducers/categorySlice";
import { createProduct, uploadImage } from "../../reducers/productsSlice";
import CategoryCreateI from "../../types/CategoryCreateI";
import CategoryI from "../../types/CategoryI";
import ProductCreateI from "../../types/ProductCreateI";
import { BASE_IMAGE_URL } from "../../utils/BaseImageUrl";
import ParseCategories from "../../utils/ParseCategories";

type Props = {};

const AddCategory = (props: Props) => {
	const dispatch = useAppDispatch();
	const [categoryId, setCategoryId] = useState(1);
	const initialCategoryState: CategoryCreateI = {
		categoryName: "",
		description: "",
		parentId: categoryId,
	};
	const [category, setCategory] = useState<CategoryCreateI>(initialCategoryState);

	const categories = useAppSelector(selectCategories);
	let parsedCategories: CategoryI[] = [];
	if (categories !== null) {
		parsedCategories = ParseCategories(categories);
	}
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(categoryId);
		console.log(category);
		try {
			const { failed } = await dispatch(createCategory(category)).unwrap();

			console.log(failed);
			if (!failed) {
				dispatch(fetchCategories());
				setCategory(initialCategoryState);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelectChange = (e: SelectChangeEvent<number>) => {
		setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setCategoryId(Number(e.target.value));
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
			<br />
			<TextField value={category.categoryName} onChange={(e) => handleChanged(e)} required color="info" style={{ width: "200px", margin: "5px" }} type="text" label="Category Name" name="categoryName" variant="outlined" />
			<br />
			<TextField value={category.description} onChange={(e) => handleChanged(e)} required multiline rows={4} color="info" style={{ width: "200px", margin: "5px" }} type="text" name="description" label="Category Description" variant="outlined" />
			<br />
			<Select onChange={(e) => handleSelectChange(e)} value={categoryId} size="small" sx={{ height: 1 }} name="parentId" autoFocus>
				{parsedCategories.map((val) => {
					return (
						<MenuItem key={val.id} value={val.id}>
							{val.categoryName}
						</MenuItem>
					);
				})}
			</Select>
			<br />
			<Button type="submit" variant="contained" color="primary">
				save
			</Button>
		</form>
	);
};

export default AddCategory;
