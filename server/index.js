import express from "express";

import authLoginRout from "./router/authRoute.js"; // Default import
import adminRoute from "./router/adminRoute.js";
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Set up the routes for admin login and registration
app.use("/auth", authLoginRout); // Use the router as middleware for '/auth' routes
app.use("/admin", adminRoute);
const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
