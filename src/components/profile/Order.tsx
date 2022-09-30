import { ShoppingBag } from "@mui/icons-material";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import orderSlice, { selectOrders } from "../../reducers/orderSlice";
import { BASE_IMAGE_URL } from "../../utils/BaseImageUrl";
import OrderList from "../checkout/OrderList";

type Props = {};

const Order = (props: Props) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const order = useAppSelector(selectOrders).find((val) => val.id === Number.parseInt(id || ""));
	console.log(order);
	if (!order) {
		return <p>fetching</p>;
	}
	return (
		<Box display="flex" flexDirection={"column"}>
			<Grid container sx={{ minWidth: "100%" }} spacing={3}>
				<Grid item lg={8} md={8} sm={12} xs={12}>
					<Paper elevation={0} sx={{ display: "flex", flexDirection: "row", padding: "5px", alignItems: "center", backgroundColor: "background.default" }}>
						<ShoppingBag color="secondary" />
						<Typography variant="h2" sx={{ fontSize: "25px", fontWeight: "bold", marginX: "12px" }}>
							Order Details
						</Typography>
					</Paper>
					<Paper>
						<Paper sx={{ bgcolor: "background.default", display: "flex", flex: "1 1 0", padding: "15px 10px", justifyContent: "space-between" }} elevation={0}>
							<Box display={"flex"}>
								<Typography variant="body1" fontSize={"15px"} color={"primary.gray"} marginRight={"5px"}>
									Order ID:
								</Typography>
								<Typography variant="body1" fontSize={"15px"} color={"primary.blue"}>
									{id}
								</Typography>
							</Box>
							<Box display={"flex"}>
								<Typography variant="body1" fontSize={"15px"} color={"primary.gray"} marginRight={"5px"}>
									Order placed:
								</Typography>
								<Typography variant="body1" fontSize={"15px"} color={"primary.blue"}>
									{moment(order.timeOrdered).format("DD MMM, YYYY ")}
								</Typography>
							</Box>
						</Paper>
						{order.cartItems.map((cartItem) => {
							return (
								<Box sx={{ display: "flex", alignItems: "center", padding: "16px 20px" }}>
									<Avatar sx={{ width: "74px", height: "76px", marginX: "16px" }} variant="square">
										<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={BASE_IMAGE_URL + cartItem.product.imagesUrl[0]} alt={cartItem.product.name} />
									</Avatar>
									<Box sx={{ flex: "1 1 0" }}>
										<Link to={"/product/" + cartItem.product.slug}>
											<Typography variant="h5" sx={{ fontSize: "14px", fontWeight: "500" }}>
												{cartItem.product.name}
											</Typography>
										</Link>
										<Typography variant="caption" sx={{ fontSize: "10px" }}>
											${cartItem.product.price} x {cartItem.quantity}
										</Typography>
										<Typography variant="h5" color="secondary" sx={{ fontSize: "14px", fontWeight: "500" }}>
											${(cartItem.product.price * cartItem.quantity).toFixed(2)}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Paper>
				</Grid>
				<Grid item lg={4} md={4} sm={12} xs={12}>
					<OrderList cart={{ cartItems: order.cartItems, totalCost: order.totalCost }} />
				</Grid>
				<Grid gridRow={1} item md={12} xs={12}>
					<Paper sx={{ flexDirection: "column", padding: "15px 25px", marginY: "20px", width: "60%" }}>
						<Typography variant="body1" fontSize={"16px"} fontWeight={"bold"} marginBottom={"10px"}>
							Shipping Address
						</Typography>
						<Typography variant="body1" fontSize={"16px"}>
							Street Line: {order.deliveryAddress.streetLine}
						</Typography>
						<Typography variant="body1" fontSize={"16px"}>
							City: {order.deliveryAddress.city}
						</Typography>
						<Typography variant="body1" fontSize={"16px"}>
							Zip Code: {order.deliveryAddress.zipCode}
						</Typography>
						<Typography variant="body1" fontSize={"16px"}>
							Phone Number: {order.deliveryAddress.phoneNumber}
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Order;
