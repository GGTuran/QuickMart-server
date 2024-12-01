import { model, Schema } from "mongoose";
import { TCart, TCartItem } from "./cart.interface";

const cartItemSchema = new Schema<TCartItem>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
);

const cartSchema = new Schema<TCart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        vendorId: {
            type: Schema.Types.ObjectId,
            ref: "Vendor",
            required: false,
        },
        items: [cartItemSchema],
        totalCost: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Cart = model<TCart>("Cart", cartSchema);