import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../components/profile/Dashboard";
import Orders from "../components/profile/Orders";
import { Container } from "@mui/system";
import WishList from "../components/profile/WishList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchOrders, selectOrders, selectOrdersStatus } from "../reducers/orderSlice";
import { IDLE } from "../utils/states";

type Props = {};

const ProfilePage = (props: Props) => {
	const orders = useAppSelector(selectOrders);
	const dispatch = useAppDispatch();
	const ordersStatus = useAppSelector(selectOrdersStatus);

	useEffect(() => {
		if (ordersStatus === IDLE) {
			dispatch(fetchOrders());
		}
	}, []);
	return (
		<Grid spacing={3} columns={12} maxWidth="lg" container sx={{ paddingX: "24px", marginY: "2rem" }}>
			<Grid item xs={12} md={3}>
				<Dashboard />
			</Grid>
			<Grid item md={9}>
				<Routes>
					<Route path="/orders" element={<Orders orders={orders} />} />
					<Route path="/wishlist" element={<WishList />} />
				</Routes>
			</Grid>
		</Grid>
	);
};

export default ProfilePage;
