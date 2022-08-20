import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Add, AddBoxOutlined, Favorite, FavoriteBorder, Remove } from "@mui/icons-material";
import { CardMedia, Chip, IconButton } from "@mui/material";
import { useState } from "react";
import ProductI from "../../types/ProductI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFavorite, deleteFavorite } from "../../reducers/favoriteSlice";
import { BaseImageUrl } from "../../utils/BaseImageUrl";
import { addToCart, changeQuantity, selectCartItemByProductId, selectExistsInCart } from "../../reducers/cartSlice";
type ProductProps = {
	product: ProductI;
};

const Product = ({ product }: ProductProps) => {
	const dispatch = useAppDispatch();
	const cartItem = useAppSelector((state) => selectCartItemByProductId(state, product.id));
	const existsInCart = cartItem !== undefined;
	const [favorite, setFavorite] = useState(product.favorite);
	const handleClickFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (!favorite) {
			dispatch(addFavorite(product.id));
		} else {
			console.log(product);
			dispatch(deleteFavorite(product.id));
		}
		setFavorite(!favorite);
	};
	return (
		<Card sx={{ minWidth: 275, backgroundColor: "primary.main", margin: "5px", display: "flex", flexDirection: "column" }}>
			<Box sx={{ display: "inline-block", position: "relative", marginBottom: "5px" }}>
				<Chip sx={{ top: "10px", left: "10px", position: "absolute" }} label="5% off" variant="filled" size="small" color="secondary" />
				<IconButton sx={{ padding: "5px", paddingBottom: "0", top: "7px", right: "15px", position: "absolute" }} aria-label="favorite" onClick={(e) => handleClickFavorite(e)}>
					{favorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
				</IconButton>
				<img style={{ width: "100%", height: "100%", objectFit: "scale-down" }} src={BaseImageUrl + product.imagesUrl[0]} alt="product" />
			</Box>
			<Box sx={{ display: "flex", padding: "1rem" }}>
				<Box sx={{ flex: "1 1 0px", marginRight: "18px" }}>
					<Typography sx={{}} mt={2} color="text.primary">
						{product.name}
					</Typography>
					<Typography variant="subtitle1" ml={1} sx={{ fontSize: 15, color: "secondary.main", flex: "1 1 0px" }}>
						${product.price}
					</Typography>
					<Typography variant="subtitle1" ml={1} sx={{ fontSize: 15, color: "secondary.main", flex: "1 1 0px" }}>
						${product.price}
					</Typography>
					<Typography variant="subtitle1" ml={1} sx={{ fontSize: 15, color: "secondary.main", flex: "1 1 0px" }}>
						${product.price}
					</Typography>
				</Box>
				{existsInCart ? (
					<Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", justifyContent: "space-between" }}>
						<Button sx={{}} size="small" variant="outlined" color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItem.id, productId: product.id, quantity: cartItem.quantity + 1 }))}>
							<Add fontSize="small" color="secondary" />
						</Button>
						<Typography variant="subtitle2" sx={{ fontSize: "15px" }}>
							{cartItem.quantity}
						</Typography>
						<Button size="small" variant="outlined" color="secondary" onClick={() => dispatch(changeQuantity({ id: cartItem.id, productId: product.id, quantity: cartItem.quantity - 1 }))}>
							<Remove fontSize="small" />
						</Button>
					</Box>
				) : (
					<Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", justifyContent: "flex-start" }}>
						<Button variant="outlined" size="small" color="secondary" onClick={() => dispatch(addToCart({ id: 0, productId: product.id, quantity: 1 }))}>
							<Add fontSize="small" color="secondary" />
						</Button>
					</Box>
				)}
			</Box>
		</Card>
	);
};
export default Product;
