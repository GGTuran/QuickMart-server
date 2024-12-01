import express from "express";
import { cartControllers } from "./cart.controller";


const router = express.Router();

router.post("/add", cartControllers.addProductToCart);
router.post("/replace", cartControllers.replaceUserCart);
router.get("/", cartControllers.getUserCart);

export const cartRoutes = router;