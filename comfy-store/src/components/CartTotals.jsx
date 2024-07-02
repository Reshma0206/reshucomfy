import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils";

const CartTotals = () => {
  let { cartItems, numItemsInCart, cartTotal, tax, orderTotal, shipping } =
    useContext(CartContext);

  let total = (cartTotal / 100).toFixed(2);
  total = parseInt(total * 0.1);
  orderTotal = parseFloat((orderTotal / 100).toFixed(2)) + total;

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
       
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
        
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">₹{String(total) + ".00"}</span>
        </p>
       
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Order Total</span>
          <span className="font-medium">₹{orderTotal.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;

