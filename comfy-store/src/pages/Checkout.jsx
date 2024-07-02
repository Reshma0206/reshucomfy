import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";

const Checkout = () => {
  const { cartItems, orderTotal, numItemsInCart, user } =
    useContext(CartContext);

  if (cartItems.length === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
