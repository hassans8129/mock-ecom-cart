import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/Api_error.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) throw new ApiError(401, "Unauthorized request");
    q;
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "mocksecret"
    );

    const user = await User.findById(decoded._id).select("-__v");
    if (!user) throw new ApiError(401, "Invalid token");

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
