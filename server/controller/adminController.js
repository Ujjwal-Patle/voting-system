import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";
import { hashSync, compareSync } from "bcrypt";

const conn = getDBConnection();

export function adminRegister(request, response) {
  try {

    const data = request.body;
    // console.log("Received data:", data);
// console.log("Key:", request.body.key);

    if (request.body.key === 123) {
      const encptPassword = hashSync(data.admin_password, 10);
      const qry ="INSERT INTO admin (admin_name, admin_email, admin_password) VALUES (?, ?, ?)";
      const values = [data.admin_name, data.admin_email, encptPassword];
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
