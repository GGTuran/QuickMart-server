import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
        inventoryCount: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        shopId: {
            type: Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model<TProduct>("Product", productSchema);
