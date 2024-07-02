import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import axios from "axios";

const CheckoutForm = () => {
  const {
    cartItems,
    setCartItems,
    orderTotal,
    numItemsInCart,
    setNumItemsInCart,
    user,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const info = {
      userId: user._id,
      name: name,
      address: address,
    };
    const info2 = { ...info, cartItems: cartItems };
    //console.log("inside checkoutForm info", info2);

    try {
      const response = await axios.post(
        `http://127.0.0.1:5001/api/orders/${user._id}`,
        info2
      );
      toast.success("Order placed successfully");

      if (response.data.success) {
        await axios.delete(`http://127.0.0.1:5001/api/removecart/${user._id}`);
        setCartItems([]);
      }
     
      navigate("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        //error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errorMessage);
      //if (error?.response?.status === 401 || 403) navigate("/login");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput
        label="First Name"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        label="Address"
        name="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;

