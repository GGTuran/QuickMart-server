import { Types } from "mongoose";

export type TShop = {
    name: string;
    logo?: string;
    description?: string;
    vendorId: Types.ObjectId; // Reference to TUser (vendor)
};