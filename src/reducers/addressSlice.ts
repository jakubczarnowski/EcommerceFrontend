import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import ProductI from "../types/ProductI";
import ProductParamsI from "../types/ProductParamI";
import axiosInstance from "../app/axiosInstance";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
import { setMessage } from "./messageSlice";
import CartItemI from "../types/CartItemI";
import { CarCrashTwoTone } from "@mui/icons-material";
import CartI from "../types/CartI";
import AddToCartI from "../types/AddToCartI";
import { queryAllByAltText } from "@testing-library/react";
import { stat } from "fs";
import AddressI from "../types/AddressI";

interface AddressState {
	addresses: AddressI[];
	status: "idle" | "loading" | "fullfilled" | "failed";
	error: string | undefined;
}

const initialState: AddressState = {
	addresses: [],
	status: IDLE,
	error: undefined,
};

export const fetchAddress = createAsyncThunk("address/fetchAddress", async () => {
	const response = await axiosInstance.get("/address/");
	return response.data;
});

export const createAddress = createAsyncThunk("address/createAddress", async (data: AddToCartI, thunkAPI) => {
	try {
		const response = await axiosInstance.post(`/address/`, data);
		return response.data;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to create address", error: true }));
		return thunkAPI.rejectWithValue(e.response.message);
	}
});
export const deleteAddress = createAsyncThunk("address/deleteAddress", async (data: AddToCartI, thunkAPI) => {
	try {
		const response = await axiosInstance.delete(`/address/${data.id}`);
		return response.data;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to delete address", error: true }));
		return thunkAPI.rejectWithValue(e.response.message);
	}
});

export const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {
		resetState: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAddress.pending, (state) => {
				state.status = LOADING;
			})
			.addCase(fetchAddress.fulfilled, (state, action) => {
				state.status = FULLFILLED;
				state.addresses = action.payload;
			})
			.addCase(fetchAddress.rejected, (state, action) => {
				state.status = FAILED;
				state.error = action.error.message;
			})
			.addCase(createAddress.fulfilled, (state, action) => {
				state.addresses.push(action.payload);
			});
	},
});

export const selectAddress = (state: RootState) => state.address.addresses;
export const selectAddressStatus = (state: RootState) => state.address.status;
export const selectAddressError = (state: RootState) => state.address.error;
export const resetCartState = addressSlice.actions.resetState;
export default addressSlice.reducer;
