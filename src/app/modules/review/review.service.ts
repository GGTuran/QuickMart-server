// import AppError from "../../errors/AppError";
import { TReview } from "./review.interface"
import { Review } from "./review.model"

const createReviewFromDB = async (payload: TReview) => {
    const result = await Review.create(payload);
    return result;
};

const getAllReviewFromDB = async () => {
    const result = await Review.find().populate("userId").populate("productId");
    return result;
};

const getSingleReviewFromDB = async (id: string) => {
    const result = await Review.findById(id).populate("userId").populate("productId");
    return result;
};

const updateReviewIntoDB = async (id: string, updatedReview: Partial<TReview>) => {
    // const review = await Review.findById(id);
    // if (!review) {
    //     throw new AppError(404, "Review not found")
    // }
    await Review.findByIdAndUpdate(id, updatedReview).populate("userId").populate("productId");
    const result = await Review.findById(id);
    return result;
};

const deleteReviewFromDB = async (id: string) => {
    const result = await Review.findByIdAndDelete(id);
    return result;
};


export const reviewServices = {
    createReviewFromDB,
    getAllReviewFromDB,
    getSingleReviewFromDB,
    updateReviewIntoDB,
    deleteReviewFromDB
}