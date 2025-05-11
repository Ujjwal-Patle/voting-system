// import { StatusCodes } from "http-status-codes";
// import { getDBConnection } from "../config/DbConnection.js";

// const conn = getDBConnection();

// export function getPollDetails (req, res){
//   const  id  = req.params;

//   conn.query(
//     `SELECT * FROM polls 
//      WHERE id = ? 
//      AND is_active = TRUE 
//      AND start_date <= NOW() 
//      AND end_date >= NOW()`,
//     [id],
//     (err, pollResults) => {
//       if (err) {
//         console.error(err);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch poll' });
//       }

//       if (pollResults.length === 0) {
//         return res.status(StatusCodes.NOT_FOUND).send({ error: 'Poll not found or not active' });
//       }

//       conn.query('SELECT id, name, description, photo_url FROM candidates WHERE poll_id = ?',[id],(err, candidateResults) => {
//           if (err) {
//             console.error(err);
//             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch candidates' });
//           }

//           res.status(StatusCodes.OK).send({
//             ...pollResults[0],
//             candidates: candidateResults
//           });
//         }
//       );
//     }
//   );
// }

