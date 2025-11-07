import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/Api_error.js";
import { ApiResponse } from "../utils/Api_response.js";
import { asyncHandler } from "../utils/async_handler.js";

// Add to cart
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;

  if (!productId || !qty) {
    throw new ApiError(400, "Product ID and quantity are required");
  }

  let cart = await Cart.findOne();

  if (!cart) {
    cart = await Cart.create({ items: [{ productId, qty }] });
  } else {
    cart.items.push({ productId, qty });
    await cart.save();
  }

  return res.status(201).json(new ApiResponse(201, cart, "Item added to cart"));
});

// Get cart
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne().populate("items.productId", "name price");

  if (!cart) {
    return res
      .status(200)
      .json(new ApiResponse(200, { cartItems: [], total: 0 }, "Cart empty"));
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.qty,
    0
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cartItems: cart.items, total },
        "Cart fetched successfully"
      )
    );
});

// Remove from cart

export const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params; // this id will be item _id inside items []

  const cart = await Cart.findOne();
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = cart.items.filter((item) => String(item._id) !== String(id));

  await cart.save();

  await cart.populate("items.productId", "name price");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { cartItems: cart.items }, "Item removed from cart")
    );
});
