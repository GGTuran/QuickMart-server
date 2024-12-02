import express from "express";
import { orderControllers } from "./order.controller";



const router = express.Router();

router.get("/shop/:shopId", orderControllers.getShopOrders);

export const cartRoutes = router;

