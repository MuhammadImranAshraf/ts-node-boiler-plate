import express from "express";
import AuthController from "v1/controllers/auth.controller";

const router = express.Router();

const authController = new AuthController();

router.route("/signup").post(authController.signUp as any);

const authRoutes = router;
export default authRoutes;
