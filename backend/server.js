import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./src/db/index.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import checkoutRoutes from "./src/routes/checkout.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;

console.log("starting server!");

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
