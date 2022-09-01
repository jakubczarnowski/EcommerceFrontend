import { Box, Container } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import OrderList from "../components/checkout/OrderList";
import SelectAddress from "../components/checkout/SelectAddress";
import Payment from "../components/checkout/Payment";
import { selectCart } from "../reducers/cartSlice";

type Props = {};

const CheckoutPage = (props: Props) => {
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const [selectedAddressId, setSelectedAddressId] = useState(0);
	const handleSelectedAddressChange = (id: number) => {
		setSelectedAddressId(id);
	};
	const onSubmit = () => {};
	console.log(selectedAddressId);
	return (
		<Box sx={{ width: "100%", height: "100%", backgroundColor: "primary.main", margin: "0", padding: "0", position: "absolute", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ margin: "32px auto", paddingX: "24px" }}>
				<Box sx={{ display: "flex", flexDirection: "row", gap: "40px", flexWrap: { md: "noWrap", sm: "wrap", xs: "wrap" }, width: "100%" }}>
					<Box sx={{ flexGrow: "2", minWidth: { md: "66.66%", sm: "100%", xs: "100%" } }}>
						<SelectAddress setSelectedAddress={handleSelectedAddressChange} selectedAddressId={selectedAddressId} />
						<Payment />
					</Box>
					<OrderList cart={cart} />
				</Box>
			</Container>
		</Box>
	);
};

export default CheckoutPage;
