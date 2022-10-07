import { ContentPasteGoOutlined, WindowSharp } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { rejects } from "assert";
import { AxiosError } from "axios";
import axiosInstance from "../app/axiosInstance";
import { RootState } from "../app/store";
import LoginParams from "../types/LoginParams";
import RegisterParamas from "../types/RegisterParams";
import UserI from "../types/UserI";
import { IDLE } from "../utils/states";
import { resetAddressState } from "./addressSlice";
import { resetCartState } from "./cartSlice";
import { setMessage } from "./messageSlice";
import { resetOrderState } from "./orderSlice";
import { resetProductState } from "./productsSlice";

interface AuthState {
	user: UserI | null;
	isLoggedIn: boolean;
	status: string;
}
const userObject = localStorage.getItem("user");
let user: UserI | null;
if (userObject != null) {
	user = JSON.parse(userObject || "{}");
} else {
	user = null;
}

export const register = createAsyncThunk("auth/register", async (params: RegisterParamas, thunkAPI) => {
	try {
		const response = await axiosInstance.post("auth/signup", JSON.stringify(params));
		thunkAPI.dispatch(setMessage({ message: "Registered Succesfully", error: false }));
		return response.data;
	} catch (err: any) {
		thunkAPI.dispatch(setMessage({ message: "Error during registration", error: true }));
		return thunkAPI.rejectWithValue({ failed: true });
	}
});

export const login = createAsyncThunk("auth/login", async (parameters: LoginParams, thunkAPI) => {
	try {
		const response = await axiosInstance.post("auth/signin", JSON.stringify(parameters));
		thunkAPI.dispatch(setMessage({ message: "Logged In Succesfully", error: false }));
		return response.data;
	} catch (err: any) {
		// Create handling on backend
		thunkAPI.dispatch(setMessage({ message: "Wrong Creditentials", error: true }));
		return thunkAPI.rejectWithValue({ failed: true });
	}
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	localStorage.removeItem("user");
	window.location.reload();
});

const initialState: AuthState = user ? { isLoggedIn: true, user: user, status: IDLE } : { isLoggedIn: false, user: null, status: IDLE };

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.isLoggedIn = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoggedIn = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoggedIn = false;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = false;
				state.user = null;
				localStorage.removeItem("user");
			});
	},
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserIsLogged = (state: RootState) => state.auth.isLoggedIn;
export default authSlice.reducer;
