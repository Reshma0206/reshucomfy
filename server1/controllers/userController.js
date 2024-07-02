import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/Users.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  //console.log("userController register", req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: "User already exists",
        newUser: existingUser,
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "account created successfully",
      newUser: newUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registeration.",
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log("userController login", req.body);
  try {
    const user = await User.findOne({ email });
    //console.log("inside the usercontroller login" + user);
    if (!user) {
      return res
        .status(201)
        .send({ success: false, message: "Email is not registered." });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(201)
        .send({ success: false, message: "Invalid password" });
    }

    const token = await jwt.sign({ _id: user._id }, "HJSLDHFNSEUHVKJBG34523", {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "logged in successfully",
      user: user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login.",
      error,
    });
  }
});

export default router;

// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid email" });
//     }

//     // Send password reset email
//     // ...

//     res.status(200).json({
//       success: true,
//       message: "Password reset email sent successfully",
//     });
//   } catch (error) {
//     console.log("index.js forgot password error", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred. Please try again.",
//     });
//   }
// });
