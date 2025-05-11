import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";
import { hashSync, compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
// const { ADMIN_REGISTRATION_KEY } = process.env;

const conn = getDBConnection();


//Admain registration
export function adminRegister(request, response) {
  try {
    const data = request.body;
    console.log("Received data:", data);
    console.log("Key:", request.body.key);
    // console.log("key from env: ",ADMIN_REGISTRATION_KEY);

    if (request.body.key === 123) {
      const encptPassword = hashSync(data.password, 10);
      const qry = "INSERT INTO admins (username, password, email ) VALUES (?, ?, ?)";
      const values = [data.username, encptPassword, data.email];
      conn.query(qry, values, (error, result) => {
        if (error) {
          console.error("DB Error:", error);
          return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Database error" });
        }
        response
          .status(StatusCodes.CREATED)
          .send({ message: "Admin registered successfully!" });
      });
    } else {
      response
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Wrong admin key...!" });
    }
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "server side problem ...!" });
  }
}

//Admin Login 
export function adminLogin(request,response){
    try {
        const data = request.body;
        const qry = "SELECT * FROM admins WHERE email = ?"
        conn.query(qry,[data.email],(error,result)=>{
            if(error){
                console.log(error)
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Error in login'});
            }
            else{
                if(result.length===0){
                    response.status(StatusCodes.BAD_REQUEST).send({message:'Invalid email'});
                }
                else{
                    if(compareSync(data.password,result[0].password)){
                        const token = jwt.sign({userId:result[0].id},"secret123",{ expiresIn: '1h' });
                        response.status(StatusCodes.OK).send({token:token});
                    }
                    else{
                        response.status(StatusCodes.BAD_REQUEST).send({message:'Invalid Password'});
                    }
                } 
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong'});
    }
};


//voter registration
export function voterRegister(request, response) {
  try {
    const data = request.body;
    const encptPassword = hashSync(data.password, 10);
    const qry = "insert into voters (full_name, adhar_no, email, dob, password) values (?,?,?,?,?)";
    const values = [data.full_name, data.adhar_no, data.email, data.dob,encptPassword ];
    conn.query(qry, values, (error, result) => {
        if (error) {
            console.error("DB Error:", error); 
        if (error.errno == 1062) { //sql side error whether jo hum insert
          response
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Voter alredy exist...!" });
        } else {
          response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Problem in inserting...!" });
        }
      } else {
        response
          .status(StatusCodes.OK)
          .send({ message: "Registration sucessfull...!" });
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Problem with server...!" });
  }
}



//voter login
export function voterLogin(request, response) {
  try {
    const data = request.body;
    const qry = 'SELECT * FROM voters WHERE adhar_no = ?';

    conn.query(qry, [data.adhar_no], (error, result) => {
      if (error) {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Database error" });
      }

      if (result.length === 0) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Invalid Aadhar or password" });
      }

      // Properly compare hashed passwords
      const isMatch = compareSync(data.password, result[0].password);
      if (!isMatch) {
        return response
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Invalid Aadhar or password" });
      }

      const token = jwt.sign({ VoterId: result[0].id },"secret123",{ expiresIn: '1h' });

      return response
        .status(StatusCodes.OK)
        .send({ message: "Login successful", token });
    });
  } catch (error) {
    console.error("Login error:", error);
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong...!" });
  }
}