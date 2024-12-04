import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
    const result = await orderServices.createOrderIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Order created successfully",
        data: result,
    })
})

const getAllOrders = catchAsync(async (req, res) => {
    const result = await orderServices.getAllOrdersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: result
    })
})

const getUserOrders = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await orderServices.getOrdersByUserId(userId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: result,
    });
});


const getShopOrders = catchAsync(async (req, res) => {
    const { shopId } = req.params;
    const result = await orderServices.getOrdersByShopId(shopId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Orders retrieved successfully",
        data: result,
    });
});


export const orderControllers = {
    createOrder,
    getAllOrders,
    getUserOrders,
    getShopOrders,
}