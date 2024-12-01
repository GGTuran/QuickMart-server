import { Types } from "mongoose";
import { TPaymentStatus } from "./order.constants";

export type TOrder = {
    userId: Types.ObjectId; // Reference to TUser (customer)
    productId: Types.ObjectId; // Reference to TProduct
    shopId: Types.ObjectId;
    quantity: number;
    totalPrice: number;
    paymentStatus: TPaymentStatus;
    orderDate?: string; // ISO Date string
};
