import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";

const calculateTotalCost = async (items: { productId: string; quantity: number }[]) => {
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    return items.reduce((total, item) => {
        const product = products.find((prod) => prod._id.toString() === item.productId);
        if (!product || isNaN(product.price)) {
            console.error(`Invalid product price for product ${item.productId}`);
            return total;
        }
        return total + (product.price || 0) * item.quantity;
    }, 0);
};

const addToCart = async (userId: string, productId: string, quantity: number) => {
    console.log(userId, productId, quantity, 'from service')

    if (quantity <= 0 || isNaN(quantity)) {
        throw new AppError(400, "Quantity must be a positive number");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError(404, "Product not found");
    }

    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
        if (existingCart.vendorId && existingCart.vendorId.toString() !== product.shopId._id.toString()) {
            return { conflict: true, vendorId: product.shopId._id };
        }

        const existingItem = existingCart.items.find((item) => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            existingCart.items.push({ productId, quantity });
        }

        existingCart.totalCost = await calculateTotalCost(existingCart.items);
        // Ensure the total cost is a valid number
        if (isNaN(existingCart.totalCost)) {
            throw new AppError(500, "Failed to calculate the total cost");
        }

        await existingCart.save();
        return { conflict: false, cart: existingCart };
    }

    // Create a new cart with the correct quantity
    const newCart = new Cart({
        userId,
        vendorId: product.shopId._id,
        items: [{ productId, quantity }],
        totalCost: product.price * quantity,
    });

    // Ensure the total cost is a valid number
    if (isNaN(newCart.totalCost)) {
        throw new AppError(500, "Failed to calculate the total cost");
    }

    await newCart.save();
    return { conflict: false, cart: newCart };
};

const replaceCart = async (userId: string, productId: string, quantity: number) => {
    const product = await Product.findById(productId).populate("vendorId");
    if (!product) {
        throw new AppError(404, "Product not found");
    }

    const newCart = {
        userId,
        vendorId: product.shopId._id,
        items: [{ productId, quantity }],
        totalCost: product.price * quantity,
    };
    await Cart.findOneAndUpdate({ userId }, newCart, { upsert: true, new: true });
    return newCart;
};

const getCartDetails = async (userId: string) => {
    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "name price",
    });
    if (!cart) {
        throw new AppError(404, "Cart not found");
    }
    return cart;
};

export const cartServices = {
    addToCart,
    replaceCart,
    getCartDetails
}