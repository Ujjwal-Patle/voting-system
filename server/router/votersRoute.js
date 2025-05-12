import express from "express"
import {castVote,verifyVoter} from "../controller/voterController.js"

const votingrout = express.Router();

votingrout.post("/verifyVoter",verifyVoter);
votingrout.post("/castVote", castVote);

export default votingrout;
