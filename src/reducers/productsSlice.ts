import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import ProductI from "../types/ProductI";
import ProductParamsI from "../types/ProductParamI";
import { axiosInstance } from "../app/axiosInstance";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";

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
			});
	},
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectStatus = (state: RootState) => state.products.status;
export const selectError = (state: RootState) => state.products.error;
export default productSlice.reducer;
