import { Person, ShoppingBagOutlined } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAddress } from "../../reducers/addressSlice";
import { selectOrders } from "../../reducers/orderSlice";
import { selectFavoriteProducts } from "../../reducers/productsSlice";

const Dashboard = () => {
    const [selectedPage, setSelectedPage] = useState("");
    const handleClick = (name: string) => {
        setSelectedPage(name);
    };
    const favoriteCount = useAppSelector(selectFavoriteProducts).length;
    const addressCount = useAppSelector(selectAddress).length;
    const orderCount = useAppSelector(selectOrders).length;
    const boxStyle = (val: string) => {
        return {
            display: "flex",
            alignItems: "center",
            marginY: "1rem",
            borderLeft: selectedPage == `${val}` ? "4px solid #d23f57" : "",
            "&:hover": { borderLeft: "4px solid #d23f57" },
        };
    };
    return (
        <Paper sx={{ padding: "24px" }} elevation={1}>
            <Typography color="primary.gray" variant="body1" sx={{ fontSize: "14px", marginBottom: "10px" }}>
                DASHBOARD
            </Typography>
            <Link to="/profile/orders" onClick={() => handleClick("orders")}>
                <Box sx={boxStyle("orders")}>
                    <ShoppingBagOutlined color={selectedPage == "orders" ? "secondary" : "inherit"} fontSize="small" />
                    <Typography
                        variant="body2"
                        sx={{
                            color: selectedPage == "orders" ? "secondary.main" : "black",
                            "&:hover": { color: "secondary.main" },
                        }}
                    >
                        Orders
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: "auto" }}>
                        {orderCount}
                    </Typography>
                </Box>
            </Link>
            <Link to="/profile/wishlist" onClick={() => handleClick("wishlist")}>
                <Box sx={boxStyle("wishlist")}>
                    <ShoppingBagOutlined
                        color={selectedPage == "wishlist" ? "secondary" : "inherit"}
                        fontSize="small"
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            color: selectedPage == "wishlist" ? "secondary.main" : "black",
                            "&:hover": { color: "secondary.main" },
                        }}
                    >
                        Wishlist
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: "auto" }}>
                        {favoriteCount}
                    </Typography>
                </Box>
            </Link>
            <Typography color="primary.gray" variant="body1" sx={{ fontSize: "14px", marginToY: "20px 10px" }}>
                PROFILE
            </Typography>
            <Link to="/profile" onClick={() => handleClick("profile")}>
                <Box sx={boxStyle("profile")}>
                    <Person color={selectedPage == "profile" ? "secondary" : "inherit"} fontSize="small" />
                    <Typography
                        variant="body2"
                        sx={{
                            color: selectedPage == "profile" ? "secondary.main" : "black",
                            "&:hover": { color: "secondary.main" },
                        }}
                    >
                        Profile info
                    </Typography>
                </Box>
            </Link>
        </Paper>
    );
};

export default Dashboard;
