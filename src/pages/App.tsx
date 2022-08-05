import React, { useEffect } from "react";
import logo from "../logo.svg";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MessageDropdown from "../components/MessageDropdown";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ProfilePage from "./ProfilePage";

function App() {
	return (
		<div className="App">
			<MessageDropdown />
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/product" element={<ProductPage />}></Route>
				<Route path="/profile" element={<ProfilePage />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/register" element={<RegisterPage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
