import { ArrowForward, ShoppingBag } from "@mui/icons-material";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectOrders } from "../../reducers/orderSlice";
import OrderGetI from "../../types/OrderGetI";

type Props = {
	orders: OrderGetI[];
};
const StyledText = ({ text }: { text: string | JSX.Element }) => (
	<Typography variant="h3" sx={{ fontSize: "16px", fontWeight: "600", marginX: "12px", flex: "1 1 0" }} color="primary.gray">
		{text}
	</Typography>
);

const Orders = ({ orders }: Props) => {
	const navigate = useNavigate();
	console.log(orders);

	return (
		<Box>
			<Paper elevation={0} sx={{ display: "flex", flexDirection: "row", padding: "5px", alignItems: "center", backgroundColor: "background.default" }}>
				<ShoppingBag color="secondary" />
				<Typography variant="h2" sx={{ fontSize: "25px", fontWeight: "bold", marginX: "12px" }}>
					My orders
				</Typography>
			</Paper>
			<Paper elevation={0} sx={{ display: "flex", flexDirection: "row", padding: "5px", alignItems: "center", backgroundColor: "background.default" }}>
				<StyledText text="Order #" />

				<StyledText text="Status" />

				<StyledText text="Date Purchased" />

				<StyledText text="Total" />

				<Typography variant="h3" sx={{ fontSize: "16px", fontWeight: "600", marginX: "12px", flex: "0 0 0px" }} color="primary.gray"></Typography>
			</Paper>
			{orders.map((order) => {
				return (
					<Paper key={order.id} elevation={4} sx={{ display: "flex", flexDirection: "row", padding: "5px", alignItems: "center", marginY: "10px" }}>
						<StyledText text={"#" + order.id} />
						<StyledText text={<Chip color="secondary" label={order.status} />} />
						<StyledText text={new Date(order.timeOrdered).toLocaleDateString()} />
						<StyledText text={"$" + order.totalCost.toFixed(2)} />
						<IconButton onClick={() => navigate("/profile/orders/" + order.id)} sx={{ flex: "0 0 0px" }}>
							<ArrowForward />
						</IconButton>
					</Paper>
				);
			})}
		</Box>
	);
};

export default Orders;
