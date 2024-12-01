/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { USER_ROLE } from "../user/user.constants";
import { reviewControllers } from "./review.controller";




const router = express.Router();

router.post(
    "/",
    //  auth(USER_ROLE.admin, USER_ROLE.vendor),
    reviewControllers.createReview);


router.get("/", reviewControllers.getAllReviews);

router.get("/:id", reviewControllers.getSingleReview)

router.patch(
    "/:id",
    //  auth(USER_ROLE.admin),
    reviewControllers.updateReview);
router.delete(
    "/:id",
    // auth(USER_ROLE.admin, USER_ROLE.user),
    reviewControllers.deleteReview);


export const reviewRoutes = router;