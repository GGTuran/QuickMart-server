/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from "express";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TShop } from "./shop.interface";
import { Shop } from "./shop.model";

const createShopIntoDB = async (payload: TShop) => {
    const result = await Shop.create(payload);
    return result;
}

const getAllShopsFromDB = async () => {
    const result = await Shop.find();
    return result;
}

const getSingleShopFromDB = async (id: string) => {
    const result = await Shop.findById(id);
    if (!result) {
        throw new AppError(404, "Shop not found");
    };
    return result;
};

const updateShopIntoDB = async (id: string, updateData: Partial<TShop>) => {
    const updatedShop = await Shop.findByIdAndUpdate(id, updateData, {
        new: true,
    })
        // .populate("Shop")
        ;
    if (!updatedShop) {
        throw new AppError(404, "Post not found");
    }
    return updatedShop;
};

const deleteShopFromDb = async (id: string) => {
    const result = await Shop.findByIdAndDelete(id);
    return result;
};

const followShopFromDB = async (req: Request) => {

    const userId = req?.user?.userId;
    const shopId = req.body.shopId;

    const user = await User.findById(userId);
    const shop = await Shop.findById(shopId);

    if (!user) {
        throw new AppError(404, 'User not found');
    }
    if (!shop) {
        throw new AppError(404, 'Shop not found');
    }

    // Follow the shop if not already followed
    if (!user.followingShops.includes(shopId)) {
        user.followingShops.push(shopId); // Add shop to user's followingShops
        shop.followers += 1; // Increment followersCount for the shop
        await user.save();
        await shop.save();
    }

    return { user, shop };
};

const unFollowShopFromDB = async (req: Request) => {
    const userId = req?.user?.userId;
    const shopId = req.body.shopId;

    const user = await User.findById(userId);
    const shop = await Shop.findById(shopId);

    if (!user) {
        throw new AppError(404, 'User not found');
    }
    if (!shop) {
        throw new AppError(404, 'Shop not found');
    }
    // Unfollow the shop only if it is being followed
    if (user.followingShops.includes(shopId)) {
        user.followingShops = user.followingShops.filter((id) => id.toString() !== shopId); // Remove shop from user's followingShops
        if (shop.followers > 0) {
            shop.followers -= 1; // Decrement followersCount for the shop
        }
        await user.save();
        await shop.save();
    }

    return { user, shop };
};


export const shopServices = {
    createShopIntoDB,
    getAllShopsFromDB,
    getSingleShopFromDB,
    updateShopIntoDB,
    deleteShopFromDb,
    followShopFromDB,
    unFollowShopFromDB
}