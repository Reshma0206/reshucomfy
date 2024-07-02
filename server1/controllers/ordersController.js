import express from "express";
import Order from "../models/Order.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/orders/:id", async (req, res) => {
  //console.log("ordersController", req.params);
  try {
    const { userId, name, address, cartItems, numItemsInCart, orderTotal } =
      req.body;
    const order = new Order({
      userId: userId,
      name: req.body.name,
      address: req.body.address,
      cartItems: req.body.cartItems,
    });
    await order.save();
    res
      .status(200)
      .send({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

router.get("/getorders/:id", async (req, res) => {
  //console.log("inside orderController get", req.params);
  try {
    const userId = req.params.id;
    const orders = await Order.find({ userId: userId });
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error while fetching the order items." });
  }
});

export default router;
