import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";



const createCategoryIntoDB = async (payload: TCategory) => {
    const result = await Category.create(payload);
    return result;
};


const getAllCategoriesFromDB = async () => {
    const result = await Category.find();
    return result;
};


const getCategoryById = async (id: string) => {
    const result = await Category.findById(id);
    if (!result) {
        throw new AppError(404, "Category not found");
    }
    return result;
};


const updateCategoryInDB = async (id: string, updateData: Partial<TCategory>) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    if (!updatedCategory) {
        throw new AppError(404, "Category not found");
    }
    return updatedCategory;
};


const deleteCategoryFromDB = async (id: string) => {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
        throw new AppError(404, "Category not found");
    }
    return deletedCategory;
};

export const categoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getCategoryById,
    updateCategoryInDB,
    deleteCategoryFromDB,
};
