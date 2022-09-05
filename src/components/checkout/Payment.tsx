import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import axiosInstance from "../../app/axiosInstance";
import { BASE_URL } from "../../utils/BaseUrl";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51LdCHZBKEPMX5hknwI5Qw9m0NPkGmMSNcmn8fVSmyPsbOuxPH41Z4KZHJcS4KNcQRg8syjv3NQzRDlA5RTI8Qg2a00sckIHYAK");
const Payment = () => {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		axiosInstance.post("/payment/charge", JSON.stringify({ items: [{ id: "xl-tshirt" }] })).then((data) => setClientSecret(data.data));
	}, []);

	const options = {
		clientSecret,
	};
	return (
		<Box style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
			<Paper color="primary" elevation={1} sx={{ padding: "1.5rem 1.75rem" }}>
				<Box sx={{ display: "flex", gap: "12px", marginBottom: "28px", flexDirection: "row", alignItems: "center" }}>
					<Avatar sx={{ backgroundColor: "secondary.main" }}>2</Avatar>
					<Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "400" }}>
						Order And Pay
					</Typography>
					{clientSecret && (
						<Elements options={options} stripe={stripePromise}>
							<CheckoutForm />
						</Elements>
					)}
				</Box>
			</Paper>
		</Box>
	);
};
export default Payment;
