import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { shopServices } from "./shop.service";

const createShop = catchAsync(async (req, res) => {
    // console.log(req.body.data);
    // console.log(req.file);
    const result = await shopServices.createShopIntoDB({
        ...JSON.parse(req?.body?.data),
        logo: req.file?.path,
    });
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Shop created successfully",
        data: result,
    });
});


const getAllShops = catchAsync(async (req, res) => {
    const result = await shopServices.getAllShopsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Shops retrieved successfully",
        data: result,
    });
});

const getSingleShop = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await shopServices.getSingleShopFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Shop retrieved successfully",
        data: result,
    });
});

const updateShop = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await shopServices.updateShopIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Shop retrieved successfully",
        data: result,
    });
});


const deleteShop = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await shopServices.deleteShopFromDb(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Shop deleted successfully",
        data: result,
    });
})

export const shopControllers = {
    createShop,
    getAllShops,
    getSingleShop,
    updateShop,
    deleteShop
}
