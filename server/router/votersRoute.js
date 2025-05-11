import express from "express"

import {voterRegister} from "../controller/voterController.js"

const votingrout = express.Router();

votingrout.post("/",voterRegister);
export default votingrout;
