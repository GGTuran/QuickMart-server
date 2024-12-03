import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        }],
        shopId: {
            type: Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid"],
            default: "pending",
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const Order = model<TOrder>("Order", orderSchema);
