import { body, param } from "express-validator";

export const addToCartValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID format"),

  body("qty")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

export const removeFromCartValidator = [
  param("id").isMongoId().withMessage("Invalid cart item ID"), // PARAMS:- using to validate route parameters (req.params) in URLs.
];
