import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//import { customFetch } from "../utils";
import { OrdersList, SectionTitle } from "../components";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Orders = () => {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5001/api/getorders/${user._id}`
        );
        //console.log("Orders.jsx get", response);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [user]);

  if (orders.length < 1) {
    return <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList orders={orders} />
    </>
  );
};

export default Orders;
