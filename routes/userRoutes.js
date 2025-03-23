import express from "express";
import user from "../controller/user.js";

const router = express.Router();
const {createUser,loginUser} = user;

router.post("/register", createUser);

router.post("/login", loginUser);
export default router;