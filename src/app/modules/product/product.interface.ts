import { Types } from "mongoose";

export type TProduct = {
    name: string;
    price: number;
    category: Types.ObjectId;
    image?: string;
    inventoryCount: number;
    discount?: number;
    shopId: Types.ObjectId;
    reviews?: Types.ObjectId[];
};
