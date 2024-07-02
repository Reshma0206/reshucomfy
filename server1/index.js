import express from "express";
import mongoose from "mongoose";
import cors from "cors";
//import apiRouter from "./routes/api.js";
import userController from "./controllers/userController.js";
import cartController from "./controllers/cartController.js";
import ordersController from "./controllers/ordersController.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/reshmadatabase").then(() => {  
  console.log("mongodb connected");
});

//app.use("/api", apiRouter);
app.use("/api", userController);
app.use("/api", cartController);
app.use("/api", ordersController);

app.listen(5001, () => {
  console.log(`Server running on port 5001`);
});
