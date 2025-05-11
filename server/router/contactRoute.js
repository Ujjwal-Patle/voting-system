import express from "express";
import { contact} from "../controller/contactUS.js";

const contactRout = express.Router();

contactRout.post("/contact",contact);

export default contactRout;