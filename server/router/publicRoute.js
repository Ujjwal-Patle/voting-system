import express from "express";
import { getAllActivePolls, getPollDetails } from "../controller/publicControll.js";

const publicRout = express.Router();

publicRout.get("/polls", getAllActivePolls);
publicRout.get("/polls/:id", getPollDetails);

export default publicRout;