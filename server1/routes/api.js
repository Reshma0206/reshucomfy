// routes/api.js
import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/userController.js";
//import cartController from "../controllers/cartController.js";

const router = express.Router();

console.log("api route panichestundi");
router.post("/register", registerController);
router.post("/login", loginController);

router.get("test", testController);
// router.post("/cart", cartController.createCart);
//router.get("/cart/:userId", cartController.getCart);
//router.post("/api/cart/products", cartController.addProductToCart);
// router.patch("/cart/products/:productId", cartController.updateProductQuantity);
// router.delete(
//   "/cart/products/:productId",
//   cartController.removeProductFromCart
// );

export default router;
