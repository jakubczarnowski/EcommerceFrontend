import AddressI from "./AddressI";
import CartItemI from "./CartItemI";
import PaymentStatusE from "./PaymentStatusE";

export default interface OrderGetI {
    id: number;
    cartItems: CartItemI[];
    totalCost: number;
    timeOrdered: Date;
    status: PaymentStatusE;
    paymentStatus: PaymentStatusE;
    deliveryAddress: AddressI;
    moreInfo: string;
    active: boolean;
}
