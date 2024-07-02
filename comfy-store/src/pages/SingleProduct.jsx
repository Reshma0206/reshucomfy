import { useLoaderData, useNavigate } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOptions } from "../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export const loader = async ({ params }) => {
  //console.log("pages/SingleProduct.jsx", params);
  const response = await customFetch(`/products/${params.id}`);
  return { product: response.data.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  //console.log("singleproduct", product);
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();
  const { addToCart, cartItems, setCartItems, user, calculateCartTotals } =
    useContext(CartContext);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    title,
    company,
    price,
    image,
    productColor,
    amount,
  };

  const addToCartHandler = () => {
    addToCart(cartProduct);
    navigate("/cart");
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />

        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider  capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(20)}
            </select>
          </div>

          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={addToCartHandler}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;

// useEffect(() => {
//   console.log(cartItems);
//   calculateCartTotals(cartItems);
// }, [cartItems, calculateCartTotals]);

// const addToCartHandler = async () => {
//   try {
//     // Check if the product is already in the cart
//     const existingCartItem = cartItems.find(
//       (item) =>
//         item.productID === cartProduct.productID &&
//         item.productColor === cartProduct.productColor
//     );
//     console.log("SingleProduct existingCartItem ", existingCartItem);

//     if (existingCartItem) {
//       // Update the existing cart item
//       const updatedCartItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + cartProduct.amount,
//       };
//       await updateCartItem(updatedCartItem);

//       //calculateCartTotals(cartItems);
//     } else {
//       // Add a new cart item
//       await addToCart(cartProduct);
//       setCartItems([...cartItems, cartProduct]);
//       calculateCartTotals([...cartItems, cartProduct]);
//     }

//     navigate("/cart");
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateCartItem = async (updatedCartItem) => {
//   console.log("SingleProduct updatedCartItem", updatedCartItem);
//   try {
//     const res = await axios.patch(
//       `http://localhost:5001/api/cart/updateAmount`,
//       {
//         userid: user._id,
//         productID: updatedCartItem.productID,
//         productColor: updatedCartItem.productColor,
//         amount: updatedCartItem.amount,
//       }
//     );
//     if (res.data.success) {
//       setCartItems((prevCartItems) =>
//         prevCartItems.map((item) =>
//           item.productID === updatedCartItem.productID &&
//           item.productColor === updatedCartItem.productColor
//             ? updatedCartItem
//             : item
//         )
//       );
//       //calculateCartTotals(cartItems);
//       toast.success("Cart updated");
//     } else {
//       toast.error(res.data.message);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const addToCartHandler = async () => {
//   try {
//     // Check if the product is already in the cart
//     const existingCartItem = cartItems.find(
//       (item) =>
//         item.productID === cartProduct.productID &&
//         item.productColor === cartProduct.productColor
//     );
//     console.log(" existingCartItem ", existingCartItem);
//     if (existingCartItem) {
//       // Update the existing cart item
//       await updateCartItem({
//         ...existingCartItem,
//         amount: existingCartItem.amount + cartProduct.amount,
//       });
//     } else {
//       // Add a new cart item
//       await addToCart(cartProduct);
//     }

//     navigate("/cart");
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateCartItem = async (updatedCartItem) => {
//   try {
//     const res = await axios.patch(
//       `http://localhost:5001/api/cart/updateAmount`,
//       {
//         userid: user._id,
//         productID: updatedCartItem.productID,
//         productColor: updatedCartItem.productColor,
//         amount: updatedCartItem.amount,
//       }
//     );
//     if (res.data.success) {
//       setCartItems((prevCartItems) =>
//         prevCartItems.map((item) =>
//           item.productID === updatedCartItem.productID &&
//           item.productColor === updatedCartItem.productColor
//             ? updatedCartItem
//             : item
//         )
//       );
//       toast.success("Cart updated");
//     } else {
//       toast.error(res.data.message);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
