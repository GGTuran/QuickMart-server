import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
    // console.log({
    //     ...JSON.parse(req?.body?.data),
    //     image: req?.file?.path
    // })
    const result = await categoryServices.createCategoryIntoDB({
        ...JSON.parse(req?.body?.data),
        image: req?.file?.path,

    });
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: result,
    });
});


const getAllCategories = catchAsync(async (req, res) => {
    const result = await categoryServices.getAllCategoriesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: result,
    });
});


const getCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await categoryServices.getCategoryById(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Category retrieved successfully",
        data: result,
    });
});


const updateCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await categoryServices.updateCategoryInDB(id, req);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Category updated successfully",
        data: result,
    });
});


const deleteCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await categoryServices.deleteCategoryFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Category deleted successfully",
        data: result,
    });
});

export const categoryControllers = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};