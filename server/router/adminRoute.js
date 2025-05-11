import express from "express";
import { createPoll,getAllPolls,updatePoll,deletePoll, addCandidate, updateCandidate, getPollResults } from "../controller/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const adminRout = express.Router();


adminRout.post("/createPoll",verifyToken,createPoll);
adminRout.get("/getAllPolls",verifyToken,getAllPolls);
adminRout.put("/updatePoll/:id",verifyToken,updatePoll);
adminRout.delete("/deletePoll/:id",verifyToken,deletePoll);

adminRout.post("/addCandidate/:id",verifyToken,addCandidate);
adminRout.post("/updateCandidate/:poll_id/:candidate_id",verifyToken,updateCandidate);
adminRout.get("/getPollResults/:id",verifyToken,getPollResults);

export default adminRout;