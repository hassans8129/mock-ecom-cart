import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./src/models/product.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({}); // clear old
  await Product.insertMany([
    { name: "Shoes", price: 900 },
    { name: "Earphones", price: 500 },
    { name: "Laptop Stand", price: 1200 },
    { name: "Hoodie", price: 1500 },
    { name: "Backpack", price: 700 },
  ]);
  console.log("Products seeded");
  process.exit();
});
