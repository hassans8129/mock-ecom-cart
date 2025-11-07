import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/Api_error.js";
import { ApiResponse } from "../utils/Api_response.js";
import { asyncHandler } from "../utils/async_handler.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});
