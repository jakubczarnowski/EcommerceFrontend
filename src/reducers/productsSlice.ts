import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import ProductI from "../types/ProductI";
import ProductParamsI from "../types/ProductParamI";
import axiosInstance from "../app/axiosInstance";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
import { setMessage } from "./messageSlice";
import ProductCreateI from "../types/ProductCreateI";
import axios from "axios";
import { BASE_URL } from "../utils/BaseUrl";

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

export const editProduct = createAsyncThunk("products/editProduct", async (product: ProductCreateI, thunkAPI) => {
	try {
		const response = await axiosInstance.put("/products/" + product.id, JSON.stringify(product));
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
			.addCase(createProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			});
	},
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectStatus = (state: RootState) => state.products.status;
export const selectError = (state: RootState) => state.products.error;
export default productSlice.reducer;
