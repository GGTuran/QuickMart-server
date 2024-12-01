// import AppError from "../../errors/AppError";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";
import { TReview } from "./review.interface"
import { Review } from "./review.model"

const createReviewFromDB = async (payload: TReview) => {

    // Check if product exists
    const product = await Product.findById(payload.productId);
    if (!product) {
        throw new AppError(404, "Product not found");
    }

    // Check if user exists
    const user = await User.findById(payload.userId);
    if (!user) {
        throw new AppError(404, "User not found");
    }

    const result = await Review.create(payload);
    // Ensuring the reviews array is initialized (if undefined) before pushing
    if (!product.reviews) {
        product.reviews = [];
    }
    product?.reviews.push(result._id);               // Pushing the newly created review ID
    await product.save();                            // Saving the product with the updated reviews array
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