import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import ProductParamsI from "../types/ProductParamI";
import { axiosInstance } from "../app/axiosInstance";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
import CategoryI from "../types/CategoryI";

export interface CategoryState {
	categories: CategoryI[];
	status: "idle" | "loading" | "fullfilled" | "failed";
	error: string | undefined;
}
const initialState: CategoryState = {
	categories: [],
	status: "idle",
	error: "",
};

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
	const response = await axiosInstance.get("/category/1", {});
	return response.data;
});

export const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.status = LOADING;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = FULLFILLED;
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.status = FAILED;
				state.error = action.error.message;
			});
	},
});

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoryStatus = (state: RootState) => state.categories.status;
export const selectCategoryError = (state: RootState) => state.categories.error;
export default categorySlice.reducer;
