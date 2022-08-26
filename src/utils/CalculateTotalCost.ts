import CartItemI from "../types/CartItemI";

export const CalculateTotalCost = (cartItems: CartItemI[]) => {
	let totalCost = 0;
	cartItems.forEach((cartItem) => {
		totalCost += cartItem.product.price * cartItem.quantity;
	});
	return totalCost.toFixed(2);
};
