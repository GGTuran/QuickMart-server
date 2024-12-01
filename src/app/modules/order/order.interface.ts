import { Types } from "mongoose";

export const PAYMENT_STATUS = {
    pending: "pending",
    paid: "paid",
} as const;

export type TPaymentStatus = keyof typeof PAYMENT_STATUS;

export type TOrder = {
    userId: Types.ObjectId; // Reference to TUser (customer)
    productId: Types.ObjectId; // Reference to TProduct
    quantity: number;
    totalPrice: number;
    paymentStatus: TPaymentStatus;
    orderDate?: string; // ISO Date string
};
