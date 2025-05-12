import express from "express";
import cors from 'cors';
import authLoginRout from "./router/authRoute.js";
import votersRoute from "./router/votersRoute.js";
import adminRoute from "./router/adminRoute.js";
import contactRout from "./router/contactRoute.js";
import  publicRout from "./router/publicRoute.js";
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173' // Allow only this origin
}));

// Set up the routes for admin login and registration
app.use("/home",contactRout)
app.use("/auth", authLoginRout); // Use the router as middleware for '/auth' routes
app.use("/admin", adminRoute);
app.use("/voter", votersRoute);
app.use("/public", publicRout);

const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});


