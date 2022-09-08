import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MessageDropdown from "../components/MessageDropdown";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ProfilePage from "./ProfilePage";
import { selectUser, selectUserIsLogged } from "../reducers/authSlice";
import AdminPage from "./AdminPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import { Box } from "@mui/material";
import PaymentPage from "./PaymentPage";
import Orders from "../components/profile/Orders";

function App() {
	const user = useAppSelector(selectUser);
	let isAdmin = false;
	if (user !== null) {
		isAdmin = user?.roles.includes("ROLE_ADMIN");
	}
	return (
		<Box>
			<Navbar isAdmin={isAdmin} />
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/cart" element={<CartPage />}></Route>
				<Route path="/checkout" element={<CheckoutPage />}></Route>
				<Route path="/product/:slug" element={<ProductPage />}></Route>
				<Route path="/profile/*" element={<ProfilePage />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/register" element={<RegisterPage />}></Route>
				<Route path="*" element={<Navigate replace to="/" />}></Route>
				<Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate replace to="/" />} />
				<Route path="/payment" element={<PaymentPage />} />
			</Routes>
		</Box>
	);
}

export default App;
