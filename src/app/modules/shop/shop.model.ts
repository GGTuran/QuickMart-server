import { Schema, model } from "mongoose";
import { TShop } from "./shop.interface";

const shopSchema = new Schema<TShop>(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            default: "",
        },
        description: {
            type: String,
        },
        vendorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        followers: {
            type: Number,
            default: 0,
        },

    },
    {
        timestamps: true,
    }
);

export const Shop = model<TShop>("Shop", shopSchema);
