import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosInstance from "../app/axiosInstance";
import { FAILED, FULLFILLED, LOADING } from "../utils/states";
import CategoryI from "../types/CategoryI";
import CategoryCreateI from "../types/CategoryCreateI";
import { setMessage } from "./messageSlice";
import CategoryEditI from "../types/CategoryEditI";
import ParseCategories from "../utils/ParseCategories";

export interface CategoryState {
    categories: CategoryI | null;
    status: "idle" | "loading" | "fullfilled" | "failed";
    error: string | undefined;
}
const initialState: CategoryState = {
    categories: null,
    status: "idle",
    error: "",
};

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await axiosInstance.get("/category/1", {});
    return response.data;
});

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (id: number, thunkAPI) => {
    const response = await axiosInstance.delete("/category/" + id, {});
    return response.data;
});
export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (category: CategoryCreateI, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/category", JSON.stringify(category));
            thunkAPI.dispatch(setMessage({ message: "Category added", error: false }));
            return response.data;
        } catch (err: any) {
            thunkAPI.dispatch(setMessage({ message: err.response.data.message, error: true }));
            return thunkAPI.rejectWithValue({ failed: true });
        }
    }
);

export const editCategory = createAsyncThunk("categories/editCategory", async (category: CategoryEditI, thunkAPI) => {
    try {
        const response = await axiosInstance.patch("/category/" + category.id, JSON.stringify(category));
        return response.data;
    } catch (err: any) {
        thunkAPI.dispatch(setMessage({ message: err.response.data.message, error: true }));
        return thunkAPI.rejectWithValue({ failed: true });
    }
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
export const selectCategoryById = (state: RootState, id: number) =>
    ParseCategories(state.categories.categories || ({} as CategoryI)).find((val) => val.id === id);
export const selectCategoryStatus = (state: RootState) => state.categories.status;
export const selectCategoryError = (state: RootState) => state.categories.error;
export default categorySlice.reducer;
