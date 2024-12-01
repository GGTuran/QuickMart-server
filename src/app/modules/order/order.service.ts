import { Order } from "./order.model";

const getOrdersByShopId = async (shopId: string) => {
    const orders = await Order.find({ shopId }).populate("productId userId");
    return orders;
};


export const orderServices = {
    getOrdersByShopId,
}