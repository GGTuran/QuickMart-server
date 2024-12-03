import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { productRoutes } from "../modules/product/product.routes";
import { shopRoutes } from "../modules/shop/shop.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { cartRoutes } from "../modules/cart/cart.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { orderRoutes } from "../modules/order/order.routes";



const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/product',
        route: productRoutes,
    },
    {
        path: '/shop',
        route: shopRoutes,
    },
    {
        path: '/review',
        route: reviewRoutes,
    },
    {
        path: '/cart',
        route: cartRoutes,
    },
    {
        path: '/category',
        route: categoryRoutes,
    },
    {
        path: '/order',
        route: orderRoutes,
    },
    {
        path: '/payment',
        route: PaymentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;