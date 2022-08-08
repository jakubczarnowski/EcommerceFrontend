import { Typography, Toolbar, TextField, Button, Box, Select, SelectChangeEvent, MenuItem, FormControl, ImageList, ImageListItem, CardMedia } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategories } from "../../reducers/categorySlice";
import { createProduct, uploadImage } from "../../reducers/productsSlice";
import CategoryI from "../../types/CategoryI";
import ProductCreateI from "../../types/ProductCreateI";
import { BaseImageUrl } from "../../utils/BaseImageUrl";
import ParseCategories from "../../utils/ParseCategories";

type Props = {};

const AddProduct = (props: Props) => {
	const initialProductState: ProductCreateI = {
		name: "",
		imagesUrl: [],
		price: 0,
		description: "",
		categoryId: 1,
	};
	const dispatch = useAppDispatch();
	const [product, setProduct] = useState<ProductCreateI>(initialProductState);
	const [categoryId, setCategoryId] = useState(1);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageData, setImageData] = useState<FormData | null>(null);
	const categories = useAppSelector(selectCategories);
	let parsedCategories: CategoryI[] = [];
	if (categories !== null) {
		parsedCategories = ParseCategories(categories);
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			console.log(product);
			const { failed } = await dispatch(createProduct(product)).unwrap();
			if (!failed) {
				//setProduct(initialProductState);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelectChange = (e: SelectChangeEvent<number>) => {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setCategoryId(Number(e.target.value));
	};

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files === null) {
			return;
		}
		let file = e.target.files[0];
		const data = new FormData();
		data.append("imageFile", file);
		setImagePreview(URL.createObjectURL(file));
		setImageData(data);
	};

	const uploadImageOnClick = async () => {
		if (imageData === null) {
			return;
		}
		const name = await dispatch(uploadImage(imageData)).unwrap();
		setProduct((prev) => ({ ...prev, imagesUrl: [...(prev.imagesUrl ?? []), name] }));
	};
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<br />
			<TextField value={product.name} onChange={(e) => handleChanged(e)} required color="info" style={{ width: "200px", margin: "5px" }} type="text" label="Product Name" name="name" variant="outlined" />
			<br />
			<TextField value={product.description} onChange={(e) => handleChanged(e)} required multiline rows={4} color="info" style={{ width: "200px", margin: "5px" }} type="text" name="description" label="Product Description" variant="outlined" />
			<br />
			<TextField value={product.price} onChange={(e) => handleChanged(e)} required color="info" style={{ width: "200px", margin: "5px" }} type="number" name="price" inputProps={{ step: "0.01" }} label="Price" variant="outlined" />
			<br />
			<Select onChange={(e) => handleSelectChange(e)} value={categoryId} size="small" sx={{ height: 1 }} name="categoryId" autoFocus>
				{parsedCategories.map((val) => {
					return (
						<MenuItem key={val.id} value={val.id}>
							{val.categoryName}
						</MenuItem>
					);
				})}
			</Select>
			<br />
			<Button variant="contained" component="label">
				Upload Image
				<input onChange={(e) => onFileChange(e)} hidden accept="image/*" multiple type="file" />
			</Button>
			<CardMedia sx={{ width: "60%", margin: "auto" }} component="img" image={imagePreview != null ? imagePreview : ""} />
			<br />
			<Button onClick={() => uploadImageOnClick()} variant="contained" color="primary">
				Save Image
			</Button>
			<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
				{(product.imagesUrl ?? []).map((item) => (
					<ImageListItem>
						<img src={BaseImageUrl + item} alt={"pic"} loading="lazy" />
					</ImageListItem>
				))}
			</ImageList>

			<br />
			<Button type="submit" variant="contained" color="primary">
				save
			</Button>
		</form>
	);
};

export default AddProduct;
