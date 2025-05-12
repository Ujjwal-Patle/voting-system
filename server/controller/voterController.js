// import { StatusCodes } from "http-status-codes";
// import { getDBConnection } from "../config/DbConnection.js";


// const conn = getDBConnection();

// // Verify Voter
// export function verifyVoter(req, res) {
//   try {
//      const { adhar_no, dob } = req.body;
//     conn.query(
//       `SELECT id FROM voters WHERE adhar_no = ? AND dob = ?`,
//       [adhar_no, dob],
//       (err, results) => {
//         if (err) {
//           console.error("DB error during voter verification:", err);
//           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Database error");
//         }

//         if (results.length === 0) {
//           return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Aadhaar or DOB");
//         }

//          voterId = results[0].id;
//         res.status(StatusCodes.OK).json({ message: "Voter verified", voter_id: voterId });
//       }
//     );
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Unexpected error");
//   }
// }



// export function castVote(req, res) {
  
//   try {
   
//     const { poll_id, candidate_id, voter_id } = req.body;

    
//     // Check if poll is active
//     conn.query(
//       `SELECT id, name, start_date, end_date, is_active FROM polls WHERE id = ? AND is_active = TRUE`,
//       [poll_id],
//       (err, pollResults) => {
//         if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error checking poll status");

//         console.log("Poll details:", pollResults);
//         if (pollResults.length === 0) {
//           return res.status(StatusCodes.BAD_REQUEST).send({ message: "Poll is not active or doesn't exist" });
//         }

//         const poll = pollResults[0];
//         console.log("Poll Start Date:", poll.start_date);
//         console.log("Poll End Date:", poll.end_date);
//         console.log("Is Poll Active:", poll.is_active);

//         // Check if the voter has already voted in this poll
//         conn.query(
//           `SELECT id FROM votes WHERE poll_id = ? AND voter_id = ?`,
//           [poll_id, voter_id],
//           (err, voteResults) => {
//             if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error checking previous vote");

//             if (voteResults.length > 0) {
//               return res.status(StatusCodes.CONFLICT).send("You have already voted in this poll");
//             }

//             // Check if the candidate belongs to the poll
//             conn.query(
//               `SELECT id FROM candidates WHERE id = ? AND poll_id = ?`,
//               [candidate_id, poll_id],
//               (err, candidateResults) => {
//                 if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error checking candidate");
//                 if (candidateResults.length === 0) {
//                   return res.status(StatusCodes.BAD_REQUEST).send("Invalid candidate for this poll");
//                 }

//                 // Record the vote
//                 conn.query(
//                   `INSERT INTO votes (poll_id, candidate_id, voter_id) VALUES (?, ?, ?)`,
//                   [poll_id, candidate_id, voter_id],
//                   (err, result) => {
//                     if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error recording vote");
//                     return res.status(StatusCodes.OK).send("Vote recorded successfully");
//                   }
//                 );
//               }
//             );
//           }
//         );
//       }
//     );
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Unexpected server error");
//   }
// }

import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";

const conn = getDBConnection();

// Verify Voter
export const verifyVoter = (req, res) => {
  try {
    const { adhar_no, dob } = req.body;
    conn.query(
      `SELECT id FROM voters WHERE adhar_no = ? AND dob = ?`,
      [adhar_no, dob],
      (err, results) => {
        if (err) {
          console.error("DB error during voter verification:", err);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Database error");
        }

        if (results.length === 0) {
          return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Aadhaar or DOB");
        }

        const voterId = results[0].id;
        res.status(StatusCodes.OK).json({ message: "Voter verified", voter_id: voterId });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Unexpected error");
  }
};

// Cast Vote
export const castVote = (req, res) => {
  try {
    const { poll_id, candidate_id, voter_id } = req.body;
    
    // Check if poll is active
    conn.query(
      `SELECT id, name, start_date, end_date, is_active FROM polls WHERE id = ? AND is_active = TRUE`,
      [poll_id],
      (err, pollResults) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error checking poll status");

        if (pollResults.length === 0) {
          return res.status(StatusCodes.BAD_REQUEST).send({ message: "Poll is not active or doesn't exist" });
        }

        // Check if voter has already voted
        conn.query(
          `SELECT id FROM votes WHERE poll_id = ? AND voter_id = ?`,
          [poll_id, voter_id],
          (err, voteResults) => {
            if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error checking previous vote");

            if (voteResults.length > 0) {
              return res.status(StatusCodes.CONFLICT).send("You have already voted in this poll");
            }

            // Check if candidate belongs to poll
            conn.query(
              `SELECT id FROM candidates WHERE id = ? AND poll_id = ?`,
              [candidate_id, poll_id],
              (err, candidateResults) => {
                if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error checking candidate");
                if (candidateResults.length === 0) {
                  return res.status(StatusCodes.BAD_REQUEST).send("Invalid candidate for this poll");
                }

                // Record the vote
                conn.query(
                  `INSERT INTO votes (poll_id, candidate_id, voter_id) VALUES (?, ?, ?)`,
                  [poll_id, candidate_id, voter_id],
                  (err, result) => {
                    if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error recording vote");
                    return res.status(StatusCodes.OK).send("Vote recorded successfully");
                  }
                );
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Unexpected server error");
  }
};