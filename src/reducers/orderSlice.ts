import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import ProductI from "../types/ProductI";
import ProductParamsI from "../types/ProductParamI";
import axiosInstance from "../app/axiosInstance";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
import { setMessage } from "./messageSlice";
import OrderCreateI from "../types/OrderCreateI";
import { resetCartState } from "./cartSlice";
import OrderGetI from "../types/OrderGetI";

export interface OrderState {
	orders: OrderGetI[];
	status: "idle" | "loading" | "fullfilled" | "failed";
	error: string | undefined;
}
const initialState: OrderState = {
	orders: [],
	status: "idle",
	error: "",
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
	const response = await axiosInstance.get("/orders/");
	return response.data;
});
export const fetchOrder = createAsyncThunk("orders/fetchOrders", async (id: number) => {
	const response = await axiosInstance.get("/orders/" + id);
	return response.data;
});
export const addOrder = createAsyncThunk("orders/addOrder", async (order: OrderCreateI, thunkAPI) => {
	try {
		const response = await axiosInstance.post(`/orders/`, JSON.stringify(order));
		thunkAPI.dispatch(resetCartState());
		return response.data;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to create order", error: true }));
		return thunkAPI.rejectWithValue(e.response.message);
	}
});
export const cancelOrder = createAsyncThunk("orders/cancelOrder", async (order_id: Number, thunkAPI) => {
	try {
		const response = await axiosInstance.patch(`/orders/${order_id}`);
		return response.data;
	} catch (e: any) {
		thunkAPI.dispatch(setMessage({ message: "Failed to cancel order", error: true }));
		return thunkAPI.rejectWithValue(e.response.message);
	}
});

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		resetState: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrders.pending, (state) => {
				state.status = LOADING;
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.orders.sort((a, b) => new Date(b.timeOrdered).getTime() - new Date(a.timeOrdered).getTime());
				state.status = FULLFILLED;
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.status = FAILED;
				state.error = action.error.message;
			});
	},
});

export const selectOrders = (state: RootState) => state.order.orders;
export const selectOrdersStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;
export const resetOrdedState = orderSlice.actions.resetState;
export default orderSlice.reducer;
