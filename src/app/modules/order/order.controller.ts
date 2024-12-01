import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";

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
    getShopOrders,
}