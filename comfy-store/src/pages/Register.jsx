import { FormInput, SubmitBtn } from "../components";
import { Form, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      setError("All fields are required");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    const allData = { username: username, email: email, password: password };
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/api/register",
        allData
      );

      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        setError(null);
        navigate("/login");
      } else {
        toast.error(data.message);
        setError(data.message);
      }
    } catch (err) {
      console.log("Register.jsx", err);
      toast.error(response.data.message);
      setError("Something went wrong during registration");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>

        <FormInput
          type="text"
          label="username"
          name="username"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          type="email"
          label="email"
          name="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
