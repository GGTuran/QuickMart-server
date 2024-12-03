import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServices } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
    // console.log(req.body.data);
    // console.log(req.file);
    const result = await productServices.createProductIntoDB({
        ...JSON.parse(req?.body?.data),
        image: req.file?.path,
    });
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Product created successfully",
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const result = await productServices.getAllProductsFromDB(req);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Products retrieved successfully",
        data: result,
    });
});

const getProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(id, 'from controller')
    // console.log(req.params, 'from controller')
    const result = await productServices.getProductById(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product retrieved successfully",
        data: result,
    });
});

const updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await productServices.updateProductInDB(id, req);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product updated successfully",
        data: result,
    });
});

const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await productServices.deleteProductFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product deleted successfully",
        data: result,
    });
});

const getProductsByShopId = catchAsync(async (req, res) => {
    const { shopId } = req.params;
    // console.log(id, 'from controller')
    // console.log(req.params, 'from controller')
    const result = await productServices.getProductsByShopIdFromDB(shopId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Products retrieved successfully",
        data: result,
    });
});


// const duplicateProduct = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await productServices.duplicateProductInDB(id);
//     sendResponse(res, {
//       success: true,
//       statusCode: 201,
//       message: "Product duplicated successfully",
//       data: result,
//     });
//   });


export const productControllers = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByShopId
}