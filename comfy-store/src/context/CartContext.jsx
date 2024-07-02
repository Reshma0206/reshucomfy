import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [numItemsInCart, setNumItemsInCart] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [user, setUser] = useState();
  const [orderTotal, setOrderTotal] = useState(0);

  const shipping = 500;

  const fetchCartItems = async (userId) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5001/api/getcartitems/${userId}`
      );
      setCartItems(res.data.products);
      calculateCartTotals(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateCartTotals = (cartItems) => {
    let itemsTotal = 0;
    let numItems = 0;
    cartItems.forEach((item) => {
      itemsTotal += item.price * item.amount;
      numItems = parseInt(numItems) + parseInt(item.amount);
    });
    setNumItemsInCart(numItems);
    setCartTotal(itemsTotal);
    setTax(0.1 * numItems);
    setOrderTotal(itemsTotal + shipping + tax);
  };

  const addToCart = async (product) => {
    //console.log("cartContext addToCart", product);
    //console.log("cartContext", cartItems);

    const existingProduct = cartItems.find(
      (item) =>
        item.productID === product.productID &&
        item.productColor === product.productColor
    );

    if (existingProduct) {
      console.log("addToCart existingProduct", existingProduct);
      // Update the amount of the existing product
      const updatedAmount = existingProduct.amount + product.amount;
      const updatedProduct = { ...existingProduct, amount: updatedAmount };
      //console.log("addToCart updatedProduct", updatedProduct);
      setCartItems((currentCartItems) => {
        //console.log("addToCart currentcartItems", currentCartItems);
        const newCartItems = currentCartItems.map((item) => {
          if (
            item.productID === product.productID &&
            item.productColor === product.productColor
          ) {
            return updatedProduct;
          }
          return item;
        });
        //console.log("addToCart newCartItems", newCartItems);
        calculateCartTotals(newCartItems);
        return newCartItems;
      });
    } else {
      const data = {
        userid: user._id,
        cartID: product.cartID,
        productID: product.productID,
        title: product.title,
        company: product.company,
        price: product.price,
        image: product.image,
        productColor: product.productColor,
        amount: product.amount,
      };
      try {
        const response = await axios.post(
          "http://127.0.0.1:5001/api/cart/products",
          data
        );
        const newCartItems = [...cartItems, data];
        //console.log("cartContext addToCart", newCartItems);
        setCartItems(newCartItems);
        calculateCartTotals(newCartItems);
        toast.success("Item added to cart");
      } catch (error) {
        console.error(error);
        toast.error("Error adding product to cart");
      }
    }
  };

  const updateAmount = async (cartItem, newAmount) => {
    //console.log("cartContext update", cartItem, amount);
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/cart/updateAmount`,
        {
          userid: user._id,
          productID: cartItem.productID,
          productColor: cartItem.productColor,
          amount: newAmount,
        }
      );
      const updatedCartItems = [...cartItems];
      //console.log("cartContext updatedCartItems", updatedCartItems);
      const index = updatedCartItems.findIndex(
        (item) =>
          item.productID === cartItem.productID &&
          item.productColor === cartItem.productColor
      );
      //console.log(index);
      if (index !== -1) {
        updatedCartItems[index].amount = newAmount;
      }
      setCartItems(updatedCartItems);
      calculateCartTotals(updatedCartItems);
      toast.success("Cart updated");
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (product) => {
    //console.log("user removed product'", product);

    try {
      const response = await axios.delete(
        `http://127.0.0.1:5001/api/cart/remove`,
        {
          data: {
            userid: user._id,
            productID: product.productID,
            productColor: product.productColor,
          },
        }
      );

      setCartItems((currentCartItems) => {
        //console.log("cartContext delet", currentCartItems);
        const newCartItems = currentCartItems.filter(
          (item) =>
            !(
              item.productID === product.productID &&
              item.productColor === product.productColor
            )
        );
        calculateCartTotals(newCartItems);
        //console.log("cartContext delete", newCartItems);
        return newCartItems;
      });
      toast.error("Item removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    //console.log("cartContext", storedUser);
    if (storedUser) {
      setUser(storedUser);
      //setIsLoggedIn(true);
      fetchCartItems(storedUser._id);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        numItemsInCart,
        cartTotal,
        tax,
        user,
        setUser,
        orderTotal,
        shipping,
        addToCart,
        removeFromCart,
        updateAmount,
        calculateCartTotals,
        //logout,
        //isLoggedIn,
        //checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };

// useEffect(() => {
//   setUser(JSON.parse(localStorage.getItem("user")));
//   if (cartItems !== undefined && cartItems.length > 0) {
//     let itemsTotal = 0;
//     let numItems = 0;
//     cartItems.forEach((item) => {
//       itemsTotal += item.price * item.amount;
//       numItems += item.amount;
//     });
//     setNumItemsInCart(numItems);
//     setCartTotal(itemsTotal);
//     setTax(0.1 * numItems);
//     setOrderTotal(itemsTotal + shipping + tax);
//   }
//   const pro = async () => {
//     if (user._id) {
//       const res = await axios.get(
//         `http://127.0.0.1:5001/api/getcartitems/${user._id}`
//       );
//       console.log("CartContext", res.data.products);
//       setCartItems(res.data.products);
//       console.log(cartItems);
//     }
//   };
//   pro();
// }, []);

// const updateAmount = (cartItem, newAmount) => {
//   axios
//     .patch(`/api/cart/products/${cartItem.productId}`, {
//       quantity: newAmount,
//     })
//     .then((response) => {
//       setCartItems(
//         cartItems.map((item) =>
//           item.cartId === cartItem.cartId &&
//           item.productId === cartItem.productId
//             ? { ...item, amount: newAmount }
//             : item
//         )
//       );
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// .then((response) => {
//   setCartItems([...cartItems, response.data]);
// })
// .catch((error) => {
//   console.error(error);
//   // if (error.response && error.response.status === 404) {
//   //   console.error("Error: API endpoint not found");
//   // } else {
//   //   console.error("Error: Unknown error occurred");
//   // }
// });

// axios
//   .delete(`/api/cart/products/${cartItem.productId}`)
//   .then((response) => {
//     setCartItems(
//       cartItems.filter(
//         (item) =>
//           item.cartId !== cartItem.cartId ||
//           item.productId !== cartItem.productId
//       )
//     );
//   })
//     .catch((error) => {
//       console.error(error);
//     });
// };
// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [numItemsInCart, setNumItemsInCart] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [orderTotal, setOrderTotal] = useState(0);
//   const shipping = 500;

//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedCartItems);
//   }, []);

//   useEffect(() => {
//     let itemsTotal = 0;
//     let numItems = 0;
//     cartItems.forEach((item) => {
//       itemsTotal += item.price * item.amount;
//       numItems += item.amount;
//     });
//     setNumItemsInCart(numItems);
//     setCartTotal(itemsTotal);
//     setTax(0.1 * numItems);
//     setOrderTotal(itemsTotal + shipping + tax);
//   }, [cartItems]);

//   const addToCart = (product) => {
//     const existingCartItem = cartItems.find(
//       (item) => item.cartID === product.cartID
//     );
//     let updatedCartItems;
//     if (existingCartItem) {
//       updatedCartItems = cartItems.map((item) =>
//         item.cartID === product.cartID
//           ? { ...item, amount: item.amount + 1 }
//           : item
//       );
//     } else {
//       updatedCartItems = [...cartItems, { ...product, amount: 1 }];
//     }
//     setCartItems(updatedCartItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//   };

//   const removeFromCart = (cartItem) => {
//     const updatedCartItems = cartItems.filter(
//       (item) => item.cartID !== cartItem.cartID
//     );
//     setCartItems(updatedCartItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//   };

//   // const updateAmount = (cartItem, newAmount) => {
//   //   const updatedCartItems = cartItems.map((item) =>
//   //     item.cartID === cartItem.cartID ? { ...item, amount: newAmount } : item
//   //   );
//   //   setCartItems(updatedCartItems);
//   //   localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//   // };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         numItemsInCart,
//         cartTotal,
//         tax,
//         orderTotal,
//         shipping,
//         addToCart,
//         removeFromCart,
//         updateAmount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export { CartProvider, CartContext };
