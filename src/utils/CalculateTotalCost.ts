import CartItemI from "../types/CartItemI";

export const CalculateTotalCost = (cartItems: CartItemI[]) => {
    const totalCost = cartItems.reduce((current, next) => current + next.product.price * next.quantity, 0);
    return totalCost.toFixed(2);
};
