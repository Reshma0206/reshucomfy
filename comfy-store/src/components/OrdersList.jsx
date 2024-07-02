import { formatPrice } from "../utils";

const OrdersList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <p>No orders found</p>;
  }
  //console.log("orderList", orders);
  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">total orders: {orders.length}</h4>
      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const { name, address } = order;

              const cartItems = order.cartItems;

              let numItemsInCart = cartItems.reduce(
                (total, item) => total + parseInt(item.amount),
                0
              );
              let orderTotal = cartItems.reduce(
                (total, item) => total + item.price * item.amount,
                0
              );

              let shipping = 5;
              let total = (orderTotal / 100).toFixed(2);
              total = parseInt(total * 0.1);
              orderTotal =
                parseFloat((orderTotal / 100).toFixed(2)) + total + shipping;

              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>₹{orderTotal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
