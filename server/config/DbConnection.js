import { createConnection } from "mysql2";

const conn = createConnection({
    host :"",
    user : "",
    password:"",
    database:"" 
})

conn.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log("DB connected...!")
    }
})


export function getDBConnection()
{
    return conn;
}