import express from "express";
import { orderControllers } from "./odrer.controller";



const router = express.Router();

router.get("/shop/:shopId", orderControllers.getShopOrders);

export const cartRoutes = router;

