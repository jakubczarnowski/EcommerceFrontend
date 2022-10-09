import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginParams from "../types/LoginParams";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, selectUser, selectUserIsLogged } from "../reducers/authSlice";
import { fetchCart } from "../reducers/cartSlice";

interface FormData {
	username: string;
	password: string;
}

export default function LoginPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const loggedIn = useAppSelector(selectUserIsLogged);
	if (loggedIn) {
	}
	const [formData, setFormData] = React.useState<LoginParams>({
		username: "",
		password: "",
	});
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const result = await dispatch(login(formData));
			if (result.meta.requestStatus === "fulfilled") {
				dispatch(fetchCart());
				navigate("/");
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
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField onChange={(e) => handleChanged(e)} color="info" sx={{ color: "text.main" }} margin="normal" required fullWidth label="Username" name="username" autoComplete="username" autoFocus />
					<TextField onChange={(e) => handleChanged(e)} color="info" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="/">
								<Typography color="primary.blue" variant="subtitle1">
									Forgot password?
								</Typography>
							</Link>
						</Grid>
						<Grid item>
							<Link to="/register">
								<Typography color="primary.blue" variant="subtitle1">
									Don't have an account? Sign Up
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
