import CartItem from "./CartItemI";

export default interface CartI {
	cartItems: CartItem[];
	totalCost: number;
}
