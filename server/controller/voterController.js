import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";


const conn = getDBConnection();

export function voterRegister(request, response) {
  try {
    const data = request.body;
    const qry = "insert into voters (adhar_no, voter_name, voter_email, voter_dob ) values (?,?,?,?)";
    const values = [data.adhar_no, data.voter_name, data.voter_email, data.voter_dob];
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



// Voter Login
export function voterLogin (req, res){
  try {
    const { aadhaar_number, password } = req.body;
    const qur = 'SELECT * FROM voters WHERE aadhaar_number = ?';
    const values =[aadhaar_number];
    conn.query(qry, values, (err, results) => {
        try {
          if (err) throw err;

          if (results.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({error: 'Invalid credentials'});
          }

          const voter = results[0];

          if (!compareSync(password, voter.password)) {
            
          }else{
            return res.status(StatusCodes.BAD_REQUEST).json({message : 'Invalid credentials'});
          }

          const token = jwt.sign(
            { id: voter.id, aadhaar_number: voter.aadhaar_number },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
          );

          res.status(StatusCodes.OK).send({ 
            token,
            voter: {
              id: voter.id,
              full_name: voter.full_name,
              aadhaar_number: voter.aadhaar_number,
              email: voter.email,
              is_verified: voter.is_verified
            }
          });
        } catch (err) {
          console.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            error: 'Authentication failed' 
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Server error' 
    });
  }
};
