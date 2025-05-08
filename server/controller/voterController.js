import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";


const conn = getDBConnection();

export function voterRegister(request, response) {
  try {
    const data = request.body;
    const qry =
      "insert into voters (adhar_no, voter_name, voter_email, voter_dob ) values (?,?,?,?)";
    const values = [
      data.adhar_no,
      data.voter_name,
      data.voter_email,
      data.voter_dob
    ];
    
    conn.query(qry, values, (error, result) => {
        if (error) {
            console.error("DB Error:", error); 
        if (error.errno == 1062) {
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
