import express from "express";
import { adminRegister } from "../controller/adminController.js";

const adminRout = express.Router();

adminRout.post("/",adminRegister);
export default adminRout;