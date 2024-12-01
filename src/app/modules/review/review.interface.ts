import { Types } from "mongoose";

export type TReview = {
    userId: Types.ObjectId; // Reference to TUser
    productId: Types.ObjectId; // Reference to TProduct
    rating: number;
    comment?: string;
};
