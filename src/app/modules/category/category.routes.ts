import express from "express";
import { categoryControllers } from "./category.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();


router.post("/", multerUpload.single("image"), categoryControllers.createCategory);


router.get("/", categoryControllers.getAllCategories);


router.get("/:id", categoryControllers.getCategory);


router.patch("/:id", multerUpload.single("image"), categoryControllers.updateCategory);


router.delete("/:id", categoryControllers.deleteCategory);

export const categoryRoutes = router;
