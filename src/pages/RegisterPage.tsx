import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { register, selectUserIsLogged } from "../reducers/authSlice";
import RegisterParams from "../types/RegisterParams";

export default function RegisterPage() {
	const [formData, setFormData] = React.useState<RegisterParams>({
		username: "",
		password: "",
		email: "",
		name: "",
		surname: "",
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loggedIn = useAppSelector(selectUserIsLogged);
	if (loggedIn) {
		navigate("/");
	}
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const { failed } = await dispatch(register(formData)).unwrap();
			if (!failed) {
				navigate("/login");
			}
		} catch (e) {
			console.log(e);
		}
	};
	const handleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField onChange={(e) => handleChanged(e)} color="info" autoComplete="given-name" name="name" required fullWidth id="firstName" label="First Name" autoFocus />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField onChange={(e) => handleChanged(e)} color="info" required fullWidth id="lastName" label="Last Name" name="surname" autoComplete="family-name" />
						</Grid>
						<Grid item xs={12}>
							<TextField onChange={(e) => handleChanged(e)} color="info" required fullWidth id="username" label="Username" name="username" autoComplete="nickname" />
						</Grid>
						<Grid item xs={12}>
							<TextField onChange={(e) => handleChanged(e)} inputProps={{ pattern: "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$" }} color="info" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
						</Grid>

						<Grid item xs={12}>
							<TextField onChange={(e) => handleChanged(e)} inputProps={{ pattern: "^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$" }} color="info" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, color: "primary.darker" }}>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/login">
								<Typography color="primary.blue" variant="subtitle1">
									Already have an account? Sign in
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
