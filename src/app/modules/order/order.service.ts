import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: TOrder) => {
    const result = await Order.create(payload);
    return result;
}


const getOrdersByUserId = async (userId: string) => {
    const result = await Order.find({ userId }).populate("products").populate("userId").populate("shopId");
    return result;
}


const getOrdersByShopId = async (shopId: string) => {
    const orders = await Order.find({ shopId }).populate("products").populate("userId");
    return orders;
};


export const orderServices = {
    createOrderIntoDB,
    getOrdersByUserId,
    getOrdersByShopId,
}