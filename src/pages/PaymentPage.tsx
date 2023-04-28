import { Box, CircularProgress } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../app/axiosInstance";
import { useAppDispatch } from "../app/hooks";
import CheckoutForm from "../components/checkout/CheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51LdCHZBKEPMX5hknwI5Qw9m0NPkGmMSNcmn8fVSmyPsbOuxPH41Z4KZHJcS4KNcQRg8syjv3NQzRDlA5RTI8Qg2a00sckIHYAK"
);

const PaymentPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [clientSecret, setClientSecret] = useState("");
    const { state } = useLocation();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (state === null) {
            navigate("/");
            return;
        }
        const { moreInfo, selectedAddressId, order_id } = state as {
            moreInfo: string;
            selectedAddressId: number;
            order_id: number;
        };
        axiosInstance.post("/payment/charge", JSON.stringify(order_id)).then((data) => setClientSecret(data.data));
    }, []);

    const options = {
        clientSecret,
    };
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80vw",
                height: "80vh",
                margin: "auto",
            }}
        >
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <CircularProgress color="secondary" />
            )}
        </Box>
    );
};

export default PaymentPage;
