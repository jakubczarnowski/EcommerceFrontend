import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { AccountBox, AdminPanelSettings, HowToReg, Login, Logout, ShoppingCart } from "@mui/icons-material";
import CategoriesDropdown from "./CategoriesDropdown";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser, selectUserIsLogged } from "../../reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MessageDropdown from "../MessageDropdown";
import { useState } from "react";
import CartDrawer from "../cart/CartDrawer";
import { selectCart, selectCartItemsLength } from "../../reducers/cartSlice";

type Props = {
	isAdmin: boolean;
};

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "20px",
	flexGrow: "1",
	border: "1px solid " + alpha(theme.palette.primary.dark, 0.7),
	backgroundColor: alpha(theme.palette.primary.dark, 0.1),
	"&:hover": {
		backgroundColor: alpha(theme.palette.primary.dark, 0.25),
	},
	marginRight: theme.spacing(2),
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function Navbar({ isAdmin }: Props) {
	const navigate = useNavigate();
	// cart
	const [cartOpen, setCartOpen] = useState(false);
	const onCartClose = () => {
		setCartOpen(false);
	};
	//mobile menu
	const mobileMenuId = "primary-search-account-menu-mobile";
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
	const loggedIn = useAppSelector(selectUserIsLogged);
	const user = useAppSelector(selectUser);
	const cartItemsLength = useAppSelector(selectCartItemsLength);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const dispatch = useAppDispatch();
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{loggedIn ? (
				<div>
					<MenuItem onClick={() => navigate("/profile")}>
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<AccountBox />
						</IconButton>
						<p>Profile</p>
					</MenuItem>
					<MenuItem onClick={() => setCartOpen(!cartOpen)}>
						<IconButton size="large" aria-label="Open cart" color="inherit">
							<Badge badgeContent={17} color="error">
								<ShoppingCart />
							</Badge>
						</IconButton>
						<p>Cart</p>
					</MenuItem>
					{isAdmin ? (
						<MenuItem onClick={() => navigate("/admin")}>
							<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
								<AdminPanelSettings />
							</IconButton>
							<p>Admin Panel</p>
						</MenuItem>
					) : (
						""
					)}
					<MenuItem onClick={() => dispatch(logout())}>
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<Logout />
						</IconButton>
						<p>Logout</p>
					</MenuItem>
				</div>
			) : (
				<div>
					<MenuItem onClick={() => navigate("/login")}>
						{/* // zmienic na check czy jest user */}
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<Login />
						</IconButton>
						<p>Login</p>
					</MenuItem>
					<MenuItem onClick={() => navigate("/register")}>
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<HowToReg />
						</IconButton>
						<p>Register</p>
					</MenuItem>
				</div>
			)}
		</Menu>
	);
	// Login Menu
	const loginMenuId = "login-menu";
	const [loginAnchorEl, setloginAnchorEl] = React.useState<null | HTMLElement>(null);

	const isLoginMenuOpen = Boolean(loginAnchorEl);

	const handleLoginMenuClose = () => {
		setloginAnchorEl(null);
	};

	const handleLoginMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setloginAnchorEl(event.currentTarget);
	};
	const renderLoginMenu = (
		<Menu
			anchorEl={loginAnchorEl}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isLoginMenuOpen}
			onClose={handleLoginMenuClose}
		>
			{loggedIn ? (
				<div>
					<MenuItem onClick={() => navigate("/profile")}>
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<AccountBox />
						</IconButton>
						<p>Profile</p>
					</MenuItem>

					{isAdmin ? (
						<MenuItem onClick={() => navigate("/admin")}>
							<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
								<AdminPanelSettings />
							</IconButton>
							<p>Admin Panel</p>
						</MenuItem>
					) : (
						""
					)}
					<MenuItem onClick={() => dispatch(logout())}>
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<Logout />
						</IconButton>
						<p>Logout</p>
					</MenuItem>
				</div>
			) : (
				<div>
					<MenuItem onClick={() => navigate("/login")}>
						{/* // zmienic na check czy jest user */}
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<Login />
						</IconButton>
						<p>Login</p>
					</MenuItem>
					<MenuItem onClick={() => navigate("/register")}>
						<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
							<HowToReg />
						</IconButton>
						<p>Register</p>
					</MenuItem>
				</div>
			)}
		</Menu>
	);
	return (
		<>
			<Box className="navbar" sx={{ flexGrow: 1 }}>
				<MessageDropdown />
				<AppBar position="sticky" sx={{ paddingX: "10%;", margin: 0, zIndex: "1201" }}>
					<Toolbar>
						<Typography onClick={() => navigate("/")} variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
							Exclusive
						</Typography>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
						</Search>
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<IconButton onClick={handleLoginMenuOpen} size="large" aria-label="account of current user" aria-haspopup="true" color="inherit">
								<AccountCircle />
							</IconButton>
							<IconButton onClick={() => setCartOpen(!cartOpen)} size="large" aria-label="Open cart" color="inherit">
								<Badge badgeContent={cartItemsLength} color="error">
									<ShoppingCart />
								</Badge>
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
								<MoreIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderLoginMenu}
			</Box>
			<CartDrawer open={cartOpen} onClose={onCartClose} />
		</>
	);
}
