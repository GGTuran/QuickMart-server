/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import AppError from "../../errors/AppError";

const createProductIntoDB = async (payload: TProduct) => {
    const result = await Product.create(payload);
    return result;
};

const getAllProductsFromDB = async (req: Request) => {

    // const { category, searchTerm } = req.query;

    // // Construct the category filter
    // const categoryQuery = category && category !== 'all' ? { category } : {};

    // // Construct the search query using regex for partial matching
    // const searchQuery = searchTerm
    //     ? {
    //         $or: [
    //             { title: { $regex: searchTerm, $options: 'i' } },
    //             { content: { $regex: searchTerm, $options: 'i' } },
    //             { category: { $regex: searchTerm, $options: 'i' } },
    //         ],
    //     }
    //     : {};

    // // Combine both category and search queries
    // const query = { ...categoryQuery, ...searchQuery };

    const result = await Product.find()
        // .populate("shop")
        ;
    return result;
};

const getProductById = async (id: string) => {
    const result = await Product.findById(id);
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


export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductById,
    updateProductInDB,
    deleteProductFromDB
}