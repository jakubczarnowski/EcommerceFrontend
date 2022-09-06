import { PaymentRequestCompleteStatus } from "@stripe/stripe-js";
import { StringLiteral } from "typescript";
import AddressI from "./AddressI";
import CartItemI from "./CartItemI";
import PaymentStatusE from "./PaymentStatusE";

export default interface OrderGetI {
	cartItems: CartItemI[];
	totalCost: number;
	paymentStatus: PaymentStatusE;
	deliveryAddress: AddressI;
	moreInfo: string;
	active: Boolean;
}
