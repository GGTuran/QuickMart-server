/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import AppError from "../../errors/AppError";
import { Types } from "mongoose";

const createProductIntoDB = async (payload: TProduct) => {
    const result = await Product.create(payload);
    return result;
};

const getAllProductsFromDB = async (req: Request) => {

    const { category, searchTerm } = req.query;

    // // Construct the category filter
    const categoryQuery = category && category !== 'all'
        ? { category: new Types.ObjectId(category as string) }
        : {};
    // // Construct the search query using regex for partial matching
    const searchQuery = searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                // { content: { $regex: searchTerm, $options: 'i' } },
                // { category: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};

    // // Combine both category and search queries
    const query = { ...categoryQuery, ...searchQuery };

    const result = await Product.find(query).populate('reviews').populate("shopId").populate("category");
    return result;
};

const getProductById = async (id: string) => {
    const result = await Product.findById(id).populate('reviews').populate("shopId").populate("category");
    return result;
}

const updateProductInDB = async (id: string, updateData: Partial<TProduct>) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
    })
        // .populate("Shop")
        ;
    if (!updatedProduct) {
        throw new AppError(404, "Post not found");
    }
    return updatedProduct;
};

const deleteProductFromDB = async (id: string) => {
    const deletedPost = await Product.findByIdAndDelete(id);
    if (!deletedPost) {
        throw new AppError(404, "Post not found");
    }
    return deletedPost;
};


// const duplicateProductInDB = async (id: string) => {
//     const product = await Product.findById(id);
//     if (!product) {
//       throw new AppError(404, "Product not found");
//     }

//     const duplicatedProduct = new Product({
//       ...product.toObject(),
//       _id: undefined, // Remove the existing `_id`
//       name: `${product.name} (Copy)`,
//     });

//     const savedProduct = await duplicatedProduct.save();
//     return savedProduct;
//   };

export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductById,
    updateProductInDB,
    deleteProductFromDB
}