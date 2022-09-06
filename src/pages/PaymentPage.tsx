import { Box, CircularProgress, Paper } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import axiosInstance from "../app/axiosInstance";
import CheckoutForm from "../components/checkout/CheckoutForm";

type Props = {};
const stripePromise = loadStripe("pk_test_51LdCHZBKEPMX5hknwI5Qw9m0NPkGmMSNcmn8fVSmyPsbOuxPH41Z4KZHJcS4KNcQRg8syjv3NQzRDlA5RTI8Qg2a00sckIHYAK");

const PaymentPage = (props: Props) => {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		axiosInstance.post("/payment/charge", JSON.stringify({ items: [{ id: "xl-tshirt" }] })).then((data) => setClientSecret(data.data));
	}, []);

	const options = {
		clientSecret,
	};
	return (
		<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "80vw", height: "80vh", margin: "auto" }}>
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
