import express from "express"
import * as votingRout from "./router/votersRoute.js"
import * as adminRout from "./router/adminRoute.js"
const app = express();
app.use(express.json());


//base url
app.use("/voters",votingRout);
app.use("/admin",adminRout);

const PORT = 3200;
app.listen(PORT,()=>
{
    console.log(`server is working on ${PORT}`);
    
})