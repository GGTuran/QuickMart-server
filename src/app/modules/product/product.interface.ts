import { Types } from "mongoose";

export type TProduct = {
    name: string;
    price: number;
    category: string;
    image?: string;
    inventoryCount: number;
    discount?: number;
    shopId: Types.ObjectId; // Reference to TShop
};
