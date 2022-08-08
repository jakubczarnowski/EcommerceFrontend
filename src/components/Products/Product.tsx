import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Add, AddBoxOutlined, Favorite, FavoriteBorder } from "@mui/icons-material";
import { CardMedia, IconButton } from "@mui/material";
import { useState } from "react";
import ProductI from "../../types/ProductI";
import { useAppDispatch } from "../../app/hooks";
import { addFavorite, deleteFavorite } from "../../reducers/favoriteSlice";
import { BaseImageUrl } from "../../utils/BaseImageUrl";
type ProductProps = {
	product: ProductI;
};

const Product = ({ product }: ProductProps) => {
	const dispatch = useAppDispatch();
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
	console.log(product);
	return (
		<Card sx={{ minWidth: 275, backgroundColor: "primary.main", margin: "5px" }}>
			<CardContent>
				<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", height: "20px" }}>
					<Box sx={{ borderRadius: "15px", backgroundColor: "secondary.main", padding: "5px", paddingBottom: "0", height: "20px" }}>
						<Typography sx={{ fontSize: 10, color: "primary.main" }}>5% off</Typography>
					</Box>
					<IconButton sx={{ padding: "5px", paddingBottom: "0" }} aria-label="favorite" onClick={(e) => handleClickFavorite(e)}>
						{favorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
					</IconButton>
				</Box>
				<CardMedia component="img" height="140" image={BaseImageUrl + product.imagesUrl[0]} alt="product" />
				<Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", flexDirection: "column" }}>
					<Typography sx={{}} mt={2} color="text.primary">
						{product.name}
					</Typography>
					<Typography variant="body2"></Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Typography variant="subtitle1" ml={1} sx={{ fontSize: 15, color: "secondary.main" }}>
					${product.price}
				</Typography>
				<IconButton color="secondary" size="large" sx={{ marginLeft: "auto" }}>
					<AddBoxOutlined />
				</IconButton>
			</CardActions>
		</Card>
	);
};
export default Product;
