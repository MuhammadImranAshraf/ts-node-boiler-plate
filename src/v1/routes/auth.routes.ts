import express from "express";
import AuthController from "v1/controllers/auth.controller";
import PayloadValidator from "v1/middleware/validation.middleware";
import AuthValidator from "v1/validators/auth.validator";

const router = express.Router();

const authController = new AuthController();
router
  .route("/signup")
  .post(
    PayloadValidator(AuthValidator.register),
    authController.register as any
  );

router
  .route("/login")
  .post(PayloadValidator(AuthValidator.login), authController.login as any);

router
  .route("/forgot-password")
  .post(
    PayloadValidator(AuthValidator.forgotPassword),
    authController.forgotPassword as any
  );
router
  .route("/verify-otp")
  .post(
    PayloadValidator(AuthValidator.verifyPasswordToken),
    authController.verifyPasswordToken as any
  );
router
  .route("/reset-password")
  .post(
    PayloadValidator(AuthValidator.resetPassword),
    authController.resetPassword as any
  );

router
  .route("/logout")
  .post(authController.isLoggedIn, authController.logout as any);
router
  .route("/splash")
  .get(authController.isLoggedIn, authController.splash as any);

const authRoutes = router;
export default authRoutes;
