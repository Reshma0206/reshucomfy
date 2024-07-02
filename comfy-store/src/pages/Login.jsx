import { FormInput, SubmitBtn } from "../components";
import { Form, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";


const Login = () => {
  const { user, setUser, setCartItems, cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Login.js email", email, "password", password);

    if (email === "" || password === "") {
      setError("Email and Password cannot be empty");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });

      console.log("Login.js res.data", res.data);
      if (res.data.success) {
        toast.success(res.data.message);

        setUser(res.data.user);
        //console.log("Login.js user", user);
       
        const username = res.data.user.username;
        // Store the token and username in local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/");
        fetchCartItems(res.data.user._id);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when logging in.");
    }
  };

  const fetchCartItems = async (userId) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5001/api/getcartitems/${userId}`
      );
      setCartItems(res.data.products);
      console.log("fetching in login", res.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("user"));
    if (isUser) {
      setUser(isUser);
    }
  }, []);

  return (
    <section className="h-screen grid place-items-center">
      <Form
        onSubmit={handleSubmit}
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
       
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>

        <p className="text-center">
          Forgot password?
          <Link
            to="/forgot-password"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Reset password
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;

