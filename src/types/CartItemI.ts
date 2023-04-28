import ProductI from "./ProductI";

export default interface CartItemI {
    id: number;
    quantity: number;
    product: ProductI;
}
