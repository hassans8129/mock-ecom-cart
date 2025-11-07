import express from "express";
import { loginUser, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", verifyJWT, getCurrentUser); //me:- currently logged-in user details

export default router;
