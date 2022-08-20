import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import ProductI from "../types/ProductI";
import ProductParamsI from "../types/ProductParamI";
import axiosInstance from "../app/axiosInstance";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
import { setMessage } from "./messageSlice";

export interface FavoriteState {
	products: ProductI[];
	status: "idle" | "loading" | "fullfilled" | "failed";
	error: string | undefined;
}
const initialState: FavoriteState = {
	products: [],
	status: "idle",
	error: "",
};

export const fetchFavorite = createAsyncThunk("favorite/fetchFavorite", async () => {
	const response = await axiosInstance.get("/favorite");
	return response.data;
});
export const addFavorite = createAsyncThunk("favorite/addFavorite", async (product_id: Number, thunkAPI) => {
	try {
		const response = await axiosInstance.post(`/favorite?product_id=${product_id}`);
		return response.data;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to add favorite", error: true }));
		thunkAPI.rejectWithValue(e.response.message);
	}
});
export const deleteFavorite = createAsyncThunk("favorite/deleteFavorite", async (product_id: Number, thunkAPI) => {
	try {
		const response = await axiosInstance.delete(`/favorite/${product_id}`);
		return response.data;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to add favorite", error: true }));
		thunkAPI.rejectWithValue(e.response.message);
	}
});

export const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavorite.pending, (state) => {
				state.status = LOADING;
			})
			.addCase(fetchFavorite.fulfilled, (state, action) => {
				state.status = FULLFILLED;
				state.products = action.payload;
			})
			.addCase(fetchFavorite.rejected, (state, action) => {
				state.status = FAILED;
				state.error = action.error.message;
			});
	},
});

export const selectFavorite = (state: RootState) => state.favorite.products;
export const selectFavoriteStatus = (state: RootState) => state.favorite.status;
export const selectFavoriteError = (state: RootState) => state.favorite.error;
export default favoriteSlice.reducer;
