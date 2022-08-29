import { Delete, DeleteOutline, Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Address } from "cluster";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddressModal from "../components/checkout/AddressModal";
import { deleteAddress, fetchAddress, selectAddress, selectAddressStatus } from "../reducers/addressSlice";
import { selectCart } from "../reducers/cartSlice";
import AddressI from "../types/AddressI";
import { CalculateTotalCost } from "../utils/CalculateTotalCost";
import { IDLE } from "../utils/states";

type Props = {};

const CheckoutPage = (props: Props) => {
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const addresses = useAppSelector(selectAddress);
	const addressStatus = useAppSelector(selectAddressStatus);
	const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 0);
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);
	const [editAddress, setEditAddress] = useState<AddressI>({} as AddressI);
	const [editMode, setEditMode] = useState(false);
	useEffect(() => {
		if (addressStatus === IDLE) {
			dispatch(fetchAddress());
		}
	}, [addressStatus]);
	console.log(selectedAddressId);
	return (
		<Box sx={{ width: "100%", height: "100%", backgroundColor: "primary.main", margin: "0", padding: "0", position: "absolute", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ margin: "32px auto", paddingX: "24px" }}>
				<Box sx={{ display: "flex", flexDirection: "row", gap: "40px", flexWrap: { md: "noWrap", sm: "wrap", xs: "wrap" }, width: "100%" }}>
					<Box sx={{ flexGrow: "2", minWidth: { md: "66.66%", sm: "100%", xs: "100%" } }}>
						<form style={{ display: "flex", flexDirection: "column" }}>
							<Paper color="primary" elevation={1} sx={{ padding: "1.5rem 1.75rem" }}>
								<Box sx={{ display: "flex", gap: "12px", marginBottom: "28px", flexDirection: "row", alignItems: "center" }}>
									<Avatar sx={{ backgroundColor: "secondary.main" }}>1</Avatar>
									<Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "400" }}>
										Delivery Address
									</Typography>
									<Button
										onClick={() => {
											handleOpen();
											setEditMode(false);
											setEditAddress({} as AddressI);
										}}
										color="secondary"
										variant="outlined"
										sx={{ textTransform: "none", marginY: "10px", marginLeft: "auto" }}
									>
										Add New Address
									</Button>
								</Box>
								<Typography variant="body2">Delivery Address</Typography>
								<Grid container spacing={2} columns={{ xs: 2, sm: 6, md: 12 }}>
									{/* setAddress(id) */}
									{addresses.map((address) => {
										return (
											<Grid key={address.id} item md={4} sm={3} xs={2} onClick={() => setSelectedAddressId(address.id || 0)}>
												<Paper elevation={1} sx={{ padding: "16px", position: "relative", backgroundColor: "background.default", display: "flex", flexDirection: "column", border: [selectedAddressId === address.id ? "1px solid red" : ""][0] }}>
													<Box sx={{ position: "absolute", top: "5px", right: "5px", display: "flex" }}>
														<IconButton
															onClick={() => {
																setEditMode(true);
																setEditAddress(address);
																handleOpen();
															}}
														>
															<Edit />
														</IconButton>
														<IconButton onClick={() => dispatch(deleteAddress(address.id || 0))}>
															<DeleteOutline color="secondary" />
														</IconButton>
													</Box>
													<Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "500" }}>
														{address.name}
													</Typography>
													<Typography variant="caption" sx={{ fontSize: "14px", color: "primary.dark" }}>
														{address.city} {address.zipCode}
													</Typography>
													<Typography variant="caption" sx={{ fontSize: "14px", color: "primary.dark" }}>
														{address.streetLine}
													</Typography>
													<Typography variant="caption" sx={{ fontSize: "14px", color: "primary.dark" }}>
														{address.phoneNumber}
													</Typography>
												</Paper>
											</Grid>
										);
									})}
								</Grid>
							</Paper>
						</form>
					</Box>
					<Box sx={{ flexGrow: "1" }}>
						<Typography variant="h6" sx={{ fontSize: "17px" }}>
							Your order
						</Typography>
						<Divider />
						{cart.cartItems.map((item) => {
							return (
								<Box key={item.id} sx={{ display: "flex", marginY: "8px", width: "100%" }}>
									<Typography variant="caption" sx={{ fontSize: "13px", marginBottom: "12px", overflow: "hidden" }}>
										<span style={{ fontSize: "12px", fontWeight: "bold" }}>{item.quantity}</span> x {item.product.name}
									</Typography>

									<Typography variant="caption" sx={{ fontSize: "13px", marginLeft: "auto" }}>
										{(item.quantity * item.product.price).toFixed(2)}
									</Typography>
								</Box>
							);
						})}

						<Divider sx={{ marginY: "20px" }} />
						<Box sx={{ display: "flex", marginY: "8px" }}>
							<Typography variant="caption" sx={{ fontSize: "14px", marginBottom: "12px", color: "primary.gray" }}>
								Subtotal:
							</Typography>

							<Typography variant="h6" sx={{ fontSize: "14px", marginLeft: "auto" }}>
								${CalculateTotalCost(cart.cartItems)}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", marginY: "8px" }}>
							<Typography variant="caption" sx={{ fontSize: "14px", marginBottom: "12px", color: "primary.gray" }}>
								Shipping:
							</Typography>

							<Typography variant="h6" sx={{ fontSize: "14px", marginLeft: "auto" }}>
								$9.99
							</Typography>
						</Box>
						<Divider sx={{ marginY: "20px" }} />
						<Box sx={{ display: "flex", marginY: "8px" }}>
							<Typography variant="h6" sx={{ fontSize: "14px", marginBottom: "12px" }}>
								Total:
							</Typography>

							<Typography variant="h6" sx={{ fontSize: "14px", marginLeft: "auto" }}>
								${CalculateTotalCost(cart.cartItems)}
							</Typography>
						</Box>
					</Box>
				</Box>
				<AddressModal handleClose={handleClose} open={modalOpen} edit={editMode} oldAddress={editAddress} />
			</Container>
		</Box>
	);
};

export default CheckoutPage;
