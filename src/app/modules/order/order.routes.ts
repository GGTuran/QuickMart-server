import express from "express";
import { orderControllers } from "./order.controller";



const router = express.Router();

router.post("/", orderControllers.createOrder);

router.get("/", orderControllers.getAllOrders)

router.get("/user/:userId", orderControllers.getUserOrders);

router.get("/shop/:shopId", orderControllers.getShopOrders);

export const orderRoutes = router;

