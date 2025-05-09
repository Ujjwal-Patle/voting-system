import express from "express"
import votingrout from "./router/votersRoute.js"
import adminRout from "./router/adminRoute.js";
const app = express();
app.use(express.json());


//base url
app.use("/voters",votingrout);
app.use("/admin",adminRout);


const PORT = 3200;
app.listen(PORT,()=>
{
    console.log(`server is working on ${PORT}`);
    
})