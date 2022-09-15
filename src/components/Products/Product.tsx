import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Add, AddBoxOutlined, Favorite, FavoriteBorder, Remove, TrySharp } from "@mui/icons-material";
import { CardMedia, Chip, IconButton, Rating } from "@mui/material";
import { useState } from "react";
import ProductI from "../../types/ProductI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BASE_IMAGE_URL } from "../../utils/BaseImageUrl";
import { addToCart, changeQuantity, selectCartItemByProductId, selectExistsInCart } from "../../reducers/cartSlice";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import { addFavorite, deleteFavorite } from "../../reducers/productsSlice";
import { Link } from "react-router-dom";
type ProductProps = {
	product: ProductI;
};

const Product = ({ product }: ProductProps) => {
	const dispatch = useAppDispatch();
	const cartItem = useAppSelector((state) => selectCartItemByProductId(state, product.id));
	const existsInCart = cartItem !== undefined;
	const [favorite, setFavorite] = useState(product.favorite);
	const handleClickFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		let res;
		if (!favorite) {
			res = await dispatch(addFavorite(product.id));
		} else {
			console.log(product);
			res = await dispatch(deleteFavorite(product.id));
		}
		if (res.meta.requestStatus !== "rejected") {
			setFavorite(!favorite);
		}
	};
	return (
		<Card sx={{ minWidth: 275, backgroundColor: "primary.main", margin: "5px", display: "flex", flexDirection: "column", height: "100%", maxWidth: "440px" }}>
			<Box sx={{ display: "inline-block", position: "relative", marginBottom: "5px", maxWidth: "440px", maxHeight: "440px", aspectRatio: "1/1", width: "100%", height: "100%" }}>
				<Chip sx={{ top: "10px", left: "10px", position: "absolute" }} label="5% off" variant="filled" size="small" color="secondary" />
				<IconButton sx={{ padding: "5px", paddingBottom: "0", top: "7px", right: "15px", position: "absolute" }} aria-label="favorite" onClick={(e) => handleClickFavorite(e)}>
					{favorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
				</IconButton>
				<Link to={"/product/" + product.slug}>
					<img style={{ objectFit: "contain", width: "100%", height: "100%", aspectRatio: "1/1" }} src={BASE_IMAGE_URL + product.imagesUrl[0]} alt="product" />
				</Link>
			</Box>
			<Box sx={{ display: "flex", padding: "1rem" }}>
				<Box sx={{ display: "flex", flexDirection: "column", minWidth: "0px", justifyContent: "left", marginRight: "auto" }}>
					<Link to={"/product/" + product.slug}>
						<Typography sx={{ marginY: "5px", fontSize: "14px", fontWeight: "500" }} mt={2} variant="h3" color="text.primary">
							{product.name}
						</Typography>
					</Link>

					<Rating size="small" name="read-only" sx={{ marginY: "5px" }} value={4} readOnly />
					<Typography variant="subtitle1" sx={{ fontSize: 14, color: "secondary.main", marginY: "5px", fontWeight: "600" }}>
						${product.price}
					</Typography>
				</Box>
				{existsInCart ? (
					<Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", justifyContent: "space-between" }}>
						<Button sx={{ aspectRatio: "1/1", margin: 0, minWidth: "0px", minHeight: "0px", padding: "3px" }} size="small" variant="outlined" color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 }))}>
							<Add fontSize="small" color="secondary" />
						</Button>
						<Typography variant="subtitle2" sx={{ fontSize: "15px" }}>
							{cartItem.quantity}
						</Typography>
						<Button sx={{ aspectRatio: "1/1", margin: 0, minWidth: "0px", minHeight: "0px", padding: "3px" }} size="small" variant="outlined" color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItem.id, quantity: cartItem.quantity - 1 }))}>
							<Remove fontSize="small" />
						</Button>
					</Box>
				) : (
					<Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", justifyContent: "flex-start" }}>
						<Button sx={{ aspectRatio: "1/1", margin: 0, minWidth: "0px", minHeight: "0px", padding: "3px" }} variant="outlined" size="small" color="secondary" onClick={() => dispatch(addToCart({ productId: product.id, quantity: 1 }))}>
							<Add fontSize="small" color="secondary" />
						</Button>
					</Box>
				)}
			</Box>
		</Card>
	);
};
export default Product;
