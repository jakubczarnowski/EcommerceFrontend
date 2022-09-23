import { IDLE } from "./../utils/states";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../app/axiosInstance";
import { RootState } from "../app/store";
import ProductCreateI from "../types/ProductCreateI";
import ProductI from "../types/ProductI";
import ProductParamsI from "../types/ProductParamI";
import ReviewCreateI from "../types/ReviewCreateI";
import { BASE_URL } from "../utils/BaseUrl";
import { FAILED, FULLFILLED, LOADING } from "../utils/states";
import { setMessage } from "./messageSlice";

export interface ProductState {
	products: ProductI[];
	status: "idle" | "loading" | "fullfilled" | "failed";
	error: string | undefined;
}
const initialState: ProductState = {
	products: [],
	status: "idle",
	error: "",
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (parameters: ProductParamsI) => {
	const response = await axiosInstance.get("/products", {
		params: parameters,
	});
	return response.data;
});
export const fetchProductBySlug = createAsyncThunk("products/fetchProductBySlug", async (slug: string) => {
	const response = await axiosInstance.get("/products/slug/" + slug);
	// obrzydliwe
	return response.data;
});
export const createProduct = createAsyncThunk("products/createProduct", async (product: ProductCreateI, thunkAPI) => {
	try {
		const response = await axiosInstance.post("/products", JSON.stringify(product));
		thunkAPI.dispatch(setMessage({ message: "Product added", error: false }));
		return response.data;
	} catch (err: any) {
		thunkAPI.dispatch(setMessage({ message: err.response.data.message, error: true }));
		return thunkAPI.rejectWithValue({ failed: true });
	}
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: number, thunkAPI) => {
	try {
		const response = await axiosInstance.delete("/products/" + id);
		return id;
	} catch (err: any) {
		thunkAPI.dispatch(setMessage({ message: err.response.data.message, error: true }));
		return thunkAPI.rejectWithValue({ failed: true });
	}
});

export const editProduct = createAsyncThunk("products/editProduct", async (product: ProductCreateI, thunkAPI) => {
	try {
		const response = await axiosInstance.patch("/products/" + product.id, JSON.stringify(product));
		return response.data;
	} catch (err: any) {
		thunkAPI.dispatch(setMessage({ message: err.response.data.message, error: true }));
		return thunkAPI.rejectWithValue({ failed: true });
	}
});

export const uploadImage = createAsyncThunk("products/uploadPicture", async (image: FormData, thunkAPI) => {
	try {
		const response = await axios.post(BASE_URL + `/static/upload`, image, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			onUploadProgress: (progressEvent) => {
				console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%");
			},
		});
		return response.data;
	} catch (err: any) {
		thunkAPI.rejectWithValue(err.message);
	}
});
export const addFavorite = createAsyncThunk("favorite/addFavorite", async (product_id: Number, thunkAPI) => {
	try {
		const response = await axiosInstance.post(`/favorite?product_id=${product_id}`);
		return product_id;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to add favorite", error: true }));
		return thunkAPI.rejectWithValue(e.response.message);
	}
});
export const deleteFavorite = createAsyncThunk("favorite/deleteFavorite", async (product_id: Number, thunkAPI) => {
	try {
		const response = await axiosInstance.delete(`/favorite/${product_id}`);
		return product_id;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to remove favorite", error: true }));
		return thunkAPI.rejectWithValue(e.response.message);
	}
});

export const addReview = createAsyncThunk("review/addReview", async (params: ReviewCreateI, thunkAPI) => {
	try {
		const response = await axiosInstance.post("/reviews/", JSON.stringify(params));
		return response;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to add review", error: true }));
		return thunkAPI.rejectWithValue(e.response.message);
	}
});

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = LOADING;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = FULLFILLED;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = FAILED;
				console.log(action);
				state.error = action.error.message;
			})
			.addCase(fetchProductBySlug.pending, (state) => {
				state.status = LOADING;
			})
			.addCase(fetchProductBySlug.fulfilled, (state, action) => {
				state.status = IDLE;
				const index = state.products.findIndex((p) => p.id === action.payload.id);
				if (index != -1) {
					state.products[index] = action.payload;
				} else {
					state.products.push(action.payload);
				}
			})
			.addCase(fetchProductBySlug.rejected, (state, action) => {
				state.status = FAILED;
				console.log(action);
				state.error = action.error.message;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				const id: number = state.products.findIndex((val) => val.id === action.payload);
				state.products.splice(id, 1);
			})
			.addCase(addFavorite.fulfilled, (state, action) => {
				const index = state.products.findIndex((val) => val.id === action.payload);
				const newProduct = state.products[index];
				newProduct.favorite = true;
				state.products[index] = newProduct;
			})
			.addCase(deleteFavorite.fulfilled, (state, action) => {
				const index = state.products.findIndex((val) => val.id === action.payload);
				const newProduct = state.products[index];
				newProduct.favorite = false;
				state.products[index] = newProduct;
			});
	},
});
export const selectFavoriteProducts = (state: RootState) => state.products.products.filter((val) => val.favorite === true);
export const selectProducts = (state: RootState) => state.products.products;
export const selectStatus = (state: RootState) => state.products.status;
export const selectError = (state: RootState) => state.products.error;
export const selectProductBySlug = (state: RootState, slug: string) => state.products.products.find((product) => product.slug === slug);
export default productSlice.reducer;
