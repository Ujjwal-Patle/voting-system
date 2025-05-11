import express from "express";
import { adminLogin, adminRegister, voterRegister,voterLogin } from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authLoginRout = express.Router();

authLoginRout.post("/adminReg",adminRegister);
authLoginRout.post("/adminLogin",adminLogin);
authLoginRout.post("/voterReg",voterRegister);
authLoginRout.post("/voterLogin",voterLogin);


export default authLoginRout;