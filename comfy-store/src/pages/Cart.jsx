import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItemsList from "../components/CartItemsList";
import CartTotals from "../components/CartTotals";
import { SectionTitle } from "../components";

const Cart = () => {
  const { cartItems, numItemsInCart, user } = useContext(CartContext);

  if (cartItems.length === 0 && !user) {
    return (
      <>
        <SectionTitle text="Your cart is empty" />
        <Link to="/login" className="btn btn-primary btn-block mt-8">
          please login
        </Link>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <SectionTitle text="Your cart is empty" />
      </>
    );
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          <Link to="/checkout" className="btn btn-primary btn-block mt-8">
            proceed to checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;

