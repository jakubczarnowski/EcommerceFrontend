import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosInstance from "../app/axiosInstance";
import { FAILED, FULLFILLED, IDLE, LOADING } from "../utils/states";
import { setMessage } from "./messageSlice";
import CartI from "../types/CartI";
import AddToCartI from "../types/AddToCartI";
import ChangeQuantityI from "../types/ChangeQuantityI";

interface CartState {
    cart: CartI;
    status: "idle" | "loading" | "fullfilled" | "failed";
    error: string | undefined;
}

const initialState: CartState = {
    cart: {
        cartItems: [],
        totalCost: 0,
    },
    status: IDLE,
    error: undefined,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const response = await axiosInstance.get("/cart/");
    return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (data: AddToCartI, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/cart/`, data);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.message);
    }
});
export const changeQuantity = createAsyncThunk("cart/changeQuantity", async (data: ChangeQuantityI, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`/cart/`, data);
        return response.data;
    } catch (e: any) {
        thunkAPI.dispatch(setMessage({ message: "Failed to change quantity", error: true }));
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.message);
    }
});

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = FULLFILLED;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = FAILED;
                state.error = action.error.message;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart.cartItems.push(action.payload);
            })

            .addCase(addToCart.rejected, (state, action) => {})
            .addCase(changeQuantity.fulfilled, (state, action) => {
                const cartId = state.cart.cartItems.findIndex((item) => item.id === action.payload.id);
                state.cart.cartItems[cartId].quantity = action.payload.quantity;
                if (action.payload.quantity == 0) {
                    state.cart.cartItems.splice(cartId, 1);
                }
            });
    },
});

export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartItemsLength = (state: RootState) => {
    return state.cart.cart.cartItems.reduce((curr, next) => (curr += next.quantity), 0);
};
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartError = (state: RootState) => state.cart.error;
export const selectExistsInCart = (state: RootState, id: number) =>
    state.cart.cart.cartItems.find((item) => item.id === id) !== undefined;
export const selectCartItemByProductId = (state: RootState, id: number) =>
    state.cart.cart.cartItems.find((item) => item.product.id === id);
export const resetCartState = cartSlice.actions.resetState;
export default cartSlice.reducer;
