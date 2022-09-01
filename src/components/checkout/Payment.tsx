import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import axiosInstance from "../../app/axiosInstance";
import { BASE_URL } from "../../utils/BaseUrl";

const Payment = () => {
	const initiatePay = async () => {
		const response = await axiosInstance.post("payment/charge", "", {
			headers: {
				token: "pk_test_51LdCHZBKEPMX5hknwI5Qw9m0NPkGmMSNcmn8fVSmyPsbOuxPH41Z4KZHJcS4KNcQRg8syjv3NQzRDlA5RTI8Qg2a00sckIHYAK",
				amount: "30",
			},
		});
		console.log(response);
	};
	return (
		<Box style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
			<Paper color="primary" elevation={1} sx={{ padding: "1.5rem 1.75rem" }}>
				<Box sx={{ display: "flex", gap: "12px", marginBottom: "28px", flexDirection: "row", alignItems: "center" }}>
					<Avatar sx={{ backgroundColor: "secondary.main" }}>2</Avatar>
					<Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "400" }}>
						Order And Pay
					</Typography>
					<Button onClick={initiatePay} color="secondary">
						DWILUQHDWQ
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};
export default Payment;
