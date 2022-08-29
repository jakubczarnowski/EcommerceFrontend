import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Input, Modal, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createAddress, updateAddress } from "../../reducers/addressSlice";
import AddressI from "../../types/AddressI";

type Props = {
	open: boolean;
	handleClose: () => void;
	oldAddress: AddressI;
	edit: boolean;
};

const AddressModal = ({ open, handleClose, oldAddress, edit }: Props) => {
	const [address, setAddress] = useState({ ...oldAddress });
	const dispatch = useAppDispatch();
	const handleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(address);
		if (edit) {
			address.id = oldAddress?.id;
			dispatch(updateAddress(address));
		} else {
			dispatch(createAddress(address));
		}
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose} sx={{ padding: "24px" }}>
			<DialogTitle>Add New Address Information</DialogTitle>
			<DialogContent sx={{ padding: "24px" }}>
				<Grid component="form" onSubmit={handleSubmit} container spacing={2} columns={{ sm: 6, md: 12 }}>
					<Grid item sm={3} md={6} sx={{ marginY: "5px" }}>
						<TextField onChange={(e) => handleChanged(e)} name="name" label="Address Name" color="secondary" defaultValue={oldAddress.name} variant="outlined" autoComplete="off" required />
					</Grid>
					<Grid item sm={3} md={6} sx={{ marginY: "5px" }}>
						<TextField onChange={(e) => handleChanged(e)} name="streetLine" label="Address Line" color="secondary" defaultValue={oldAddress.streetLine} variant="outlined" autoComplete="street-address" required />
					</Grid>
					<Grid item sm={3} md={6} sx={{ marginY: "5px" }}>
						<TextField onChange={(e) => handleChanged(e)} name="phoneNumber" label="Phone Number" color="secondary" defaultValue={oldAddress.phoneNumber} inputProps={{ type: "tel" }} variant="outlined" autoComplete="tel" required />
					</Grid>
					<Grid item sm={3} md={6} sx={{ marginY: "5px" }}>
						<TextField onChange={(e) => handleChanged(e)} name="city" label="City" color="secondary" defaultValue={oldAddress.city} variant="outlined" autoComplete="address-level2" required />
					</Grid>
					<Grid item sm={3} md={6} sx={{ marginY: "5px" }}>
						<TextField onChange={(e) => handleChanged(e)} name="zipCode" label="Zip Code" color="secondary" defaultValue={oldAddress.zipCode} variant="outlined" autoComplete="postal-code" required />
					</Grid>
					<Grid item sm={3} md={6} sx={{ marginY: "5px" }}></Grid>
					<Grid item sm={3} md={6} sx={{ marginY: "5px" }}>
						<Button type="submit" color="secondary" variant="contained">
							Save
						</Button>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default AddressModal;
