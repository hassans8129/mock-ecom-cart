import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cart.controller.js";
import {
  addToCartValidator,
  removeFromCartValidator,
} from "../validators/cart.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

// ADD  ITEM TO CART
router.post("/", addToCartValidator, validate, addToCart);

// REMOVE ITEM TO CART
router.delete("/:id", removeFromCartValidator, validate, removeFromCart);

// GET ALL CART ITEMS + TOTAL
router.get("/", getCart);

export default router;
