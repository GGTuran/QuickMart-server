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

    const result = await Product.find(query).populate({
        path: 'reviews',
        populate: {
            path: 'userId',
            model: 'User',
        },
    }).populate("shopId").populate("category");
    return result;
};

const getProductById = async (id: string) => {
    const result = await Product.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'userId',
            model: 'User',
        },
    }).populate("shopId").populate("category");
    return result;
}

const updateProductInDB = async (id: string, req: Request) => {

    const updatedData = {
        ...JSON.parse(req.body.data),  // Parse the form data
        ...(req.file && { image: req.file.path })  // If an image file is uploaded, add the image path
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
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


const getProductsByShopIdFromDB = async (shopId: string) => {
    const result = await Product.find({ shopId }).populate({
        path: 'reviews',
        populate: {
            path: 'userId',
            model: 'User',
        },
    }).populate("shopId").populate("category");
    return result;
}

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
    deleteProductFromDB,
    getProductsByShopIdFromDB
}





// const getAllProductsFromDB = async (req: Request) => {
//     const { category, searchTerm } = req.query;

//     // Construct the category filter
//     const categoryQuery = category && category !== 'all'
//         ? { category: new Types.ObjectId(category as string) }
//         : {};

//     // Construct the search query using regex for partial matching
//     const searchQuery = searchTerm
//         ? {
//             $or: [
//                 { name: { $regex: searchTerm, $options: 'i' } },
//                 // { content: { $regex: searchTerm, $options: 'i' } },
//                 // { category: { $regex: searchTerm, $options: 'i' } },
//             ],
//         }
//         : {};

//     // Combine both category and search queries
//     const query = { ...categoryQuery, ...searchQuery };

//     // If user is logged in and has followed shops
//     const userId = req?.user?.userId;
//     let result;
//     if (userId) {
//         // Fetch the followed shops of the logged-in user
//         const user = await User.findById(userId).select('followingShops');
//         const followedShops = user?.followingShops || [];

//         // First query for products from followed shops
//         const followedShopProducts = await Product.find({
//             ...query,
//             shopId: { $in: followedShops }
//         })
//         .populate('reviews')
//         .populate('shopId')
//         .populate('category');

//         // Then query for the rest of the products (not from followed shops)
//         const otherProducts = await Product.find({
//             ...query,
//             shopId: { $nin: followedShops }
//         })
//         .populate('reviews')
//         .populate('shopId')
//         .populate('category');

//         // Combine followed shop products and other products, putting followed shop products first
//         result = [...followedShopProducts, ...otherProducts];
//     } else {
//         // If user is not logged in, just return products based on query filters
//         result = await Product.find(query)
//             .populate('reviews')
//             .populate('shopId')
//             .populate('category');
//     }

//     return result;
// };
