import { body } from "express-validator";

export const checkoutValidator = [
  body("cartItems")
    .isArray({ min: 1 })
    .withMessage("Cart items must be a non-empty array"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];
