/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import { productControllers } from "./product.controller";


const router = express.Router();

router.post(
    "/",
    //  auth(USER_ROLE.admin, USER_ROLE.vendor),
    multerUpload.single('image'),
    productControllers.createProduct);


router.get("/", productControllers.getAllProducts);

router.get("/:id", productControllers.getProduct)

router.patch(
    "/:id",
    //  auth(USER_ROLE.admin),
    // multerUpload.single('image'),
    productControllers.updateProduct);
router.delete(
    "/:id",
    // auth(USER_ROLE.admin, USER_ROLE.user),
    productControllers.deleteProduct);


router.get("/shop/:shopId", productControllers.getProductsByShopId)


export const productRoutes = router;
