import { Delete, DeleteOutline, Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../app/hooks";

type Props = {};

const CheckoutPage = (props: Props) => {
	const dispatch = useAppDispatch();

	return (
		<Box sx={{ width: "100%", height: "100%", backgroundColor: "primary.main", margin: "0", padding: "0", position: "absolute", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ margin: "32px auto", paddingX: "24px" }}>
				<Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "20px", flexWrap: "wrap", width: "100%" }}>
					<Box sx={{ flexGrow: "2", minWidth: { md: "66.66%", sm: "100%", xs: "100%" } }}>
						<form style={{ display: "flex", flexDirection: "column" }}>
							<Paper color="primary" elevation={1} sx={{ padding: "1.5rem 1.75rem" }}>
								<Box sx={{ display: "flex", gap: "12px", marginBottom: "28px", flexDirection: "row", alignItems: "center" }}>
									<Avatar sx={{ backgroundColor: "secondary.main" }}>1</Avatar>
									<Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "400" }}>
										Delivery Address
									</Typography>
									<Button onClick={() => {}} color="secondary" variant="outlined" sx={{ textTransform: "none", marginY: "10px", marginLeft: "auto" }}>
										Add New Address
									</Button>
								</Box>
								<Typography variant="body2">Delivery Address</Typography>
								<Grid container spacing={2} columns={{ xs: 2, sm: 6, md: 12 }}>
									{/* setAddress(id) */}
									<Grid item md={4} sm={3} xs={2}>
										<Paper elevation={1} sx={{ padding: "16px", position: "relative", backgroundColor: "background.default", display: "flex", flexDirection: "column" }}>
											<Box sx={{ position: "absolute", top: "5px", right: "5px", display: "flex" }}>
												<IconButton>
													<Edit />
												</IconButton>
												<IconButton>
													<DeleteOutline color="secondary" />
												</IconButton>
											</Box>
											<Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "500" }}>
												Home
											</Typography>
											<Typography variant="caption" sx={{ fontSize: "14px", color: "primary.dark" }}>
												375 Paderewskiego
											</Typography>
											<Typography variant="caption" sx={{ fontSize: "14px", color: "primary.dark" }}>
												+48 5431312345
											</Typography>
										</Paper>
									</Grid>
								</Grid>
							</Paper>
						</form>
					</Box>
					<Box sx={{ flexGrow: "1" }}></Box>
				</Box>
			</Container>
		</Box>
	);
};

export default CheckoutPage;
