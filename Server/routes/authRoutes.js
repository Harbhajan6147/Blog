import express from "express";
import { register, login } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);

export default userRouter;
