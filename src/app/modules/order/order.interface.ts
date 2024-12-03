import { Types } from "mongoose";
import { TPaymentStatus } from "./order.constants";

export type TOrder = {
    userId: Types.ObjectId; // Reference to TUser (customer)
    products: Types.ObjectId[]; // Reference to TProduct
    shopId: Types.ObjectId;
    paymentStatus?: TPaymentStatus;
    orderDate?: string; // ISO Date string
};
