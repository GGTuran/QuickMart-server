import express from "express";
import { categoryControllers } from "./category.controller";

const router = express.Router();


router.post("/", categoryControllers.createCategory);


router.get("/", categoryControllers.getAllCategories);


router.get("/:id", categoryControllers.getCategory);


router.put("/:id", categoryControllers.updateCategory);


router.delete("/:id", categoryControllers.deleteCategory);

export const categoryRoutes = router;
