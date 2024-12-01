import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";



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
        path: '/payment',
        route: PaymentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;