import AppError from "../../errors/AppError";
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
}


export const shopServices = {
    createShopIntoDB,
    getAllShopsFromDB,
    getSingleShopFromDB,
    updateShopIntoDB,
    deleteShopFromDb
}