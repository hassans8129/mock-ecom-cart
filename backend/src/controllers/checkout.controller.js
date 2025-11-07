import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/Api_error.js";
import { ApiResponse } from "../utils/Api_response.js";
import { asyncHandler } from "../utils/async_handler.js";

// POST /api/checkout
export const checkout = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    throw new ApiError(400, "Cart is empty or invalid");
  }

  // Fetch product details
  const productIds = cartItems.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length === 0) {
    throw new ApiError(404, "Products not found");
  }

  // Calculate total
  let total = 0;
  const receiptItems = cartItems
    .map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product) return null;
      const subtotal = product.price * item.qty;
      total += subtotal;
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: item.qty,
        subtotal,
      };
    })
    .filter(Boolean);

  // Create mock receipt
  const receipt = {
    items: receiptItems,
    total,
    timestamp: new Date(),
  };

  return res
    .status(200)
    .json(new ApiResponse(200, receipt, "Checkout successful"));
});
