import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../reducers/productsSlice";
import categoriesReducer from "../reducers/categorySlice";
import authSlice from "../reducers/authSlice";
import messageSlice from "../reducers/messageSlice";
import cartSlice from "../reducers/cartSlice";
import addressSlice from "../reducers/addressSlice";
import orderSlice from "../reducers/orderSlice";
// import searchSlice from "../reducers/searchSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        auth: authSlice,
        message: messageSlice,
        cart: cartSlice,
        address: addressSlice,
        order: orderSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
