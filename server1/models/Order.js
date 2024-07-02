import mongoose from "mongoose";
const cartItemsSchema = new mongoose.Schema({
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
const orderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  //createdAt: { type: Date, default: Date.now },
  cartItems: [cartItemsSchema],
});

const Order = mongoose.model("order", orderSchema);

export default Order;
