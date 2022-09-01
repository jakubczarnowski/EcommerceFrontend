import { Edit, DeleteOutline } from "@mui/icons-material";
import { Box, Paper, Avatar, Typography, Button, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAddress, selectAddressStatus, fetchAddress, deleteAddress } from "../../reducers/addressSlice";
import { selectCart } from "../../reducers/cartSlice";
import AddressI from "../../types/AddressI";
import { IDLE } from "../../utils/states";
import AddressModal from "./AddressModal";

type Props = {
	setSelectedAddress: (id: number) => void;
	selectedAddressId: number;
};

const SelectAddress = ({ setSelectedAddress, selectedAddressId }: Props) => {
	const dispatch = useAppDispatch();
	const addresses = useAppSelector(selectAddress);
	const addressStatus = useAppSelector(selectAddressStatus);
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

	return (
		<>
			<Box style={{ display: "flex", flexDirection: "column" }}>
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
								<Grid key={address.id} item md={4} sm={3} xs={2} onClick={() => setSelectedAddress(address.id || 0)}>
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
			</Box>
			<AddressModal handleClose={handleClose} open={modalOpen} edit={editMode} oldAddress={editAddress} />
		</>
	);
};

export default SelectAddress;
