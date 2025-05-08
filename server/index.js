import express from "express"
import { getDBConnection } from "./config/DbConnection.js";
const app = express();
app.use(express.json());


//base url


const PORT = 3200;
app.listen(PORT,()=>
{
    console.log(`server is working on ${PORT}`);
    
})