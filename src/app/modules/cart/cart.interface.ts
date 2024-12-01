import { Types } from "mongoose";

export type TCartItem = {
    productId: Types.ObjectId;
    quantity: number;
};

export type TCart = {
    userId: Types.ObjectId;
    vendorId: Types.ObjectId;
    items: TCartItem[];
    totalCost: number;
};