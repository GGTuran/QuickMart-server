import { initiatePayment, verifyPayment } from "../payment/payment.utils";
import { User } from "../user/user.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: TOrder) => {


    const me = await User.findById(payload.userId);
    // console.log(me, 'from service')
    const userId = me?._id;

    const transactionId = `TXN-${Date.now()}`;


    const paymentData = {
        transactionId,
        userId,
        amount: 1000,
        customerName: me?.name,
        customerEmail: me?.email,
        customerPhone: me?.phone,
        customerAddress: me?.address,
    };

    // console.log(paymentData, 'from service payment data')

    const paymentSession = await initiatePayment(paymentData);

    const verifyResponse = await verifyPayment(transactionId);

    // console.log(verifyResponse, 'from service ')


    const result = await Order.create(payload);
    return {
        result,
        paymentSession,
        verifyResponse,

    }
        ;
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