import { Clear } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { changeQuantity } from "../../reducers/cartSlice";
import ProductI from "../../types/ProductI";
import { BASE_IMAGE_URL } from "../../utils/BaseImageUrl";
import QuantitySelector from "../QuantitySelector";

type Props = {
    product: ProductI;
    quantity: number;
    cartItemId: number;
};

const CartItem = ({ product, quantity, cartItemId }: Props) => {
    const dispatch = useAppDispatch();
    return (
        <Box sx={{ display: "flex", alignItems: "center", padding: "16px 20px" }}>
            <QuantitySelector quantity={quantity} product={product} cartItemId={cartItemId} />

            <Avatar sx={{ width: "74px", height: "76px", marginX: "16px" }} variant="square">
                <img
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src={BASE_IMAGE_URL + product.imagesUrl[0]}
                    alt={product.name}
                />
            </Avatar>
            <Box sx={{ flex: "1 1 0" }}>
                <Link to={"/product/" + product.slug}>
                    <Typography variant="h5" sx={{ fontSize: "14px", fontWeight: "500" }}>
                        {product.name}
                    </Typography>
                </Link>
                <Typography variant="caption" sx={{ fontSize: "10px" }}>
                    ${product.price} x {quantity}
                </Typography>
                <Typography variant="h5" color="secondary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                    ${(product.price * quantity).toFixed(2)}
                </Typography>
            </Box>
            <IconButton onClick={() => dispatch(changeQuantity({ id: cartItemId, quantity: 0 }))} color="secondary">
                <Clear color="disabled" />
            </IconButton>
        </Box>
    );
};

export default CartItem;
