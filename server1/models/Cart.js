import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  cartID: { type: String, required: true },
  productID: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  productColor: { type: String, required: true },
  amount: { type: String, required: true },
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
