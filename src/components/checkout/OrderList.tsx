import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import CartI from "../../types/CartI";
import { CalculateTotalCost } from "../../utils/CalculateTotalCost";

type Props = {
    cart: CartI;
};

const OrderList = ({ cart }: Props) => {
    return (
        <Box sx={{ flexGrow: "1" }}>
            <Typography variant="h6" sx={{ fontSize: "17px" }}>
                Your order
            </Typography>
            <Divider />
            {cart.cartItems.map((item) => {
                return (
                    <Box key={item.id} sx={{ display: "flex", marginY: "8px", width: "100%" }}>
                        <Typography
                            variant="caption"
                            sx={{ fontSize: "13px", marginBottom: "12px", overflow: "hidden" }}
                        >
                            <span style={{ fontSize: "12px", fontWeight: "bold" }}>{item.quantity}</span> x{" "}
                            {item.product.name}
                        </Typography>

                        <Typography variant="caption" sx={{ fontSize: "13px", marginLeft: "auto" }}>
                            ${(item.quantity * item.product.price).toFixed(2)}
                        </Typography>
                    </Box>
                );
            })}

            <Divider sx={{ marginY: "20px" }} />
            <Box sx={{ display: "flex", marginY: "8px" }}>
                <Typography variant="caption" sx={{ fontSize: "14px", marginBottom: "12px", color: "primary.gray" }}>
                    Subtotal:
                </Typography>

                <Typography variant="h6" sx={{ fontSize: "14px", marginLeft: "auto" }}>
                    ${CalculateTotalCost(cart.cartItems)}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", marginY: "8px" }}>
                <Typography variant="caption" sx={{ fontSize: "14px", marginBottom: "12px", color: "primary.gray" }}>
                    Shipping:
                </Typography>

                <Typography variant="h6" sx={{ fontSize: "14px", marginLeft: "auto" }}>
                    $9.99
                </Typography>
            </Box>
            <Divider sx={{ marginY: "20px" }} />
            <Box sx={{ display: "flex", marginY: "8px" }}>
                <Typography variant="h6" sx={{ fontSize: "14px", marginBottom: "12px" }}>
                    Total:
                </Typography>

                <Typography variant="h6" sx={{ fontSize: "14px", marginLeft: "auto" }}>
                    ${CalculateTotalCost(cart.cartItems)}
                </Typography>
            </Box>
        </Box>
    );
};

export default OrderList;
