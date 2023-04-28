import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import OrderList from "../components/checkout/OrderList";
import SelectAddress from "../components/checkout/SelectAddress";
import Payment from "../components/checkout/Payment";
import { selectCart } from "../reducers/cartSlice";
import { useNavigate } from "react-router";
import { addOrder } from "../reducers/orderSlice";
import { setMessage } from "../reducers/messageSlice";
import { selectUserIsLogged } from "../reducers/authSlice";

type Props = {
    moreInfo?: string;
};

const CheckoutPage = ({ moreInfo }: Props) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const loggedIn = useAppSelector(selectUserIsLogged);
    const navigate = useNavigate();
    const [selectedAddressId, setSelectedAddressId] = useState(0);
    const handleSelectedAddressChange = (id: number) => {
        setSelectedAddressId(id);
    };
    useEffect(() => {
        if (!loggedIn) {
            navigate("/", { replace: true });
        }
    }, []);
    const handleSubmit = async () => {
        if (selectedAddressId === 0) {
            dispatch(setMessage({ error: false, message: "Pick delivery address before checkout" }));
            return;
        }
        if (cart.cartItems.length === 0) {
            dispatch(setMessage({ error: false, message: "Add items to the cart first" }));
            return;
        }
        const clientSecret: string | null = null;
        let order_id: number | null = null;
        const fetchData = async () => {
            return await dispatch(addOrder({ moreInfo: moreInfo || "", deliveryAddressId: selectedAddressId }));
        };
        fetchData().then((data) => {
            if (data.meta.requestStatus === "fulfilled") {
                order_id = data.payload.id;
                navigate("/payment", {
                    state: { moreInfo: moreInfo, selectedAddressId: selectedAddressId, order_id: order_id },
                });
            } else {
                dispatch(setMessage({ message: "Order failed", error: true }));
            }
        });
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "primary.main",
                margin: "0",
                padding: "0",
                position: "absolute",
                overflow: "hidden",
            }}
        >
            <Container maxWidth="lg" sx={{ margin: "32px auto", paddingX: "24px" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "40px",
                        flexWrap: { md: "noWrap", sm: "wrap", xs: "wrap" },
                        width: "100%",
                    }}
                >
                    <Box sx={{ flexGrow: "2", minWidth: { md: "66.66%", sm: "100%", xs: "100%" } }}>
                        <SelectAddress
                            setSelectedAddress={handleSelectedAddressChange}
                            selectedAddressId={selectedAddressId}
                        />
                        <Payment handleSubmit={handleSubmit} />
                    </Box>
                    <OrderList cart={cart} />
                </Box>
            </Container>
        </Box>
    );
};

export default CheckoutPage;
