import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

//Add to cart
router.post("/cart/products", async (req, res) => {
  //console.log("cartController addToCart", req.body);
  const {
    userid,
    cartID,
    productID,
    title,
    company,
    price,
    image,
    productColor,
    amount,
  } = req.body;
  try {
    const cartItem = await Cart.findOne({ userid, productID, productColor });
    // Product already exists in cart, update amount
    //console.log("cartController cartItem", cartItem);
    if (cartItem) {
      cartItem.amount = cartItem.amount + amount;
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: "Product amount updated successfully",
      });
    } else {
      const newCartItem = new Cart({
        userid,
        cartID,
        productID,
        title,
        company,
        price,
        image,
        productColor,
        amount,
      });
      await newCartItem.save();

      res
        .status(201)
        .json({ success: true, message: "Product added to cart successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product to the cart",
    });
  }
});

router.delete("/cart/remove", async (req, res) => {
  //console.log("cartController Remove ", req.body);
  const { userid, productID, productColor } = req.body;
  try {
    await Cart.deleteOne({ userid, productID, productColor });

    const updatedCartItems = await Cart.find({ userid });

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      products: updatedCartItems,
    });
  } catch (error) {
    console.log("index.js login error", error);
    res.status(500).json({
      success: false,
      message: "Error while deleting the item.",
    });
  }
});

router.delete("/removecart/:id", async (req, res) => {
  const { id } = req.params;
  //console.log(id)
  try {
    await Cart.deleteMany({ userid: id });

    res.status(200).json({
      success: true,
      message: "cartItems are deleted successfully",
    });
  } catch (error) {
    console.log("index.js login error", error);
    res.status(500).json({
      success: false,
      message: "Error while deleting the cartitems.",
    });
  }
});

//Fetch items form cart
router.get("/getcartitems/:id", async (req, res) => {
  //console.log("inside the get cartitems controller");
  const id = req.params.id;
  //console.log("user id is" + id);
  try {
    const cartItems = await Cart.find({ userid: id });
    //console.log("cartController.jsx 2 Fetch items", cartItems);
    if (!cartItems) {
      return res.status(400).json({ message: "Cart not found" });
    }

    res.status(200).send({
      success: true,
      message: "cart items fetched successfully",
      products: cartItems,
    });
  } catch (error) {
    console.error(`Error getting cart: ${error}`);
    res.status(500).json({
      success: false,
      message: "Error while fetching the cart items",
    });
  }
});

// Update cart item
router.patch("/cart/updateAmount", async (req, res) => {
  const { userid, productID, productColor, amount } = req.body;

  try {
    const cartItem = await Cart.findOne({ userid, productID, productColor });

    if (!cartItem) {
      return res.status(201).json({ message: "Product not found in cart" });
    }

    cartItem.amount = amount;
    await cartItem.save();

    const updatedCartItems = await Cart.find({ userid });

    res.status(200).json({
      success: true,
      message: "Amount updated successfully",
      products: updatedCartItems,
    });
  } catch (error) {
    console.error(`Error updating cart: ${error}`);
    res.status(500).json({
      success: false,
      message: "Error while updating the cart item",
    });
  }
});

export default router;
