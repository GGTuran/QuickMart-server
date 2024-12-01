import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";


const createReview = catchAsync(async (req, res) => {

    const result = await reviewServices.createReviewFromDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Review created successfully",
        data: result,
    });
});


const getAllReviews = catchAsync(async (req, res) => {
    const result = await reviewServices.getAllReviewFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Reviews retrieved successfully",
        data: result,
    });
});

const getSingleReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await reviewServices.getSingleReviewFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Review retrieved successfully",
        data: result,
    });
});

const updateReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await reviewServices.updateReviewIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Review retrieved successfully",
        data: result,
    });
});


const deleteReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await reviewServices.deleteReviewFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Shop deleted successfully",
        data: result,
    });
})

export const reviewControllers = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}
