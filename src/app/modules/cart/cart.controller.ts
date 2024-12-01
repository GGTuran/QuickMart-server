import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { cartServices } from "./cart.service";

const addProductToCart = catchAsync(async (req, res) => {
    console.log(req.body, 'from controller')

    const { userId } = req.body;


    const result = await cartServices.addToCart(userId, req.body.items.productId, req.body.items.quantity);
    if (result.conflict) {
        return res.status(409).json({
            success: false,
            message: "Cart conflict: Products from different vendors detected",
            vendorId: result.vendorId,
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Product added successfully",
        data: result.cart,
    });
});

const replaceUserCart = catchAsync(async (req, res) => {
    const { userId } = req.body;


    const cart = await cartServices.replaceCart(userId, req.body.items.productId, req.body.items.quantity);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Cart replaced successfully",
        data: cart,
    });
});

const getUserCart = catchAsync(async (req, res) => {
    // const { userId } = req.user;
    const { userId } = req.body

    const cart = await cartServices.getCartDetails(userId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Cart details retrieved",
        data: cart,
    });
});


export const cartControllers = {
    addProductToCart,
    replaceUserCart,
    getUserCart
}