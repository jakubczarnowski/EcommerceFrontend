import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";

type props = {
	handleSubmit: () => void;
};
const Payment = ({ handleSubmit }: props) => {
	return (
		<Box style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
			<Paper color="primary" elevation={1} sx={{ padding: "1.5rem 1.75rem" }}>
				<Box sx={{ display: "flex", gap: "12px", marginBottom: "28px", flexDirection: "row", alignItems: "center" }}>
					<Avatar sx={{ backgroundColor: "secondary.main" }}>2</Avatar>
					<Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "400" }}>
						Order And Pay
					</Typography>
				</Box>
				<Button onClick={handleSubmit} variant="contained" color="secondary">
					Orded now
				</Button>
			</Paper>
		</Box>
	);
};
export default Payment;
