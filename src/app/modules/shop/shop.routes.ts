/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import { shopControllers } from "./shop.controller";



const router = express.Router();

router.post(
    "/",
    //  auth(USER_ROLE.admin, USER_ROLE.vendor),
    multerUpload.single('image'),
    shopControllers.createShop);


router.get("/", shopControllers.getAllShops);

router.get("/:id", shopControllers.getSingleShop)

router.patch(
    "/:id",
    //  auth(USER_ROLE.admin),
    // multerUpload.single('image'),
    shopControllers.updateShop);
router.delete(
    "/:id",
    // auth(USER_ROLE.admin, USER_ROLE.user),
    shopControllers.deleteShop);


export const shopRoutes = router;
