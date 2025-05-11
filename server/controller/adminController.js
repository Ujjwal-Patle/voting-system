import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";
import { hashSync, compareSync } from "bcrypt";
import { response } from "express";

const conn = getDBConnection();

// Create Poll
export function createPoll(request, response) {
    try {
        const data = request.body;
         const adminId = request.user.id;
        // Validate dates
        if (data.start_date >= data.end_date) {
            return response
                .status(StatusCodes.BAD_REQUEST)
                .send({ message: "End date must be after start date" });
        }

        const qry =
            "INSERT INTO polls (name, admin_id, start_date, end_date) VALUES (?, ?, ?, ?)";
        const values = [data.name, adminId, data.start_date, data.end_date];

        conn.query(qry, values, (error, result) => {
            if (error) {
                console.log(error);
                response
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .send({ message: "problem in creating poll" });
            } else {
                response.status(StatusCodes.CREATED).send({
                    message: "Poll created successfully",
                    pollId: result.insertId
                });
            }
        });
    } catch (err) {
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}

// Get All Polls
export function getAllPolls(request, response) {
    try {
        const adminId = request.user.id;
        console.log(adminId);

        const qry = `SELECT p.*, 
       COUNT(c.id) as candidate_count,
       COUNT(v.id) as vote_count
       FROM polls p
       LEFT JOIN candidates c ON p.id = c.poll_id
       LEFT JOIN votes v ON p.id = v.poll_id
       WHERE p.admin_id = ?
       GROUP BY p.id
       ORDER BY p.created_at DESC`;
        const values = [adminId];
        conn.query(qry, values, (error, result) => {
            if (error) {
                console.log(error);
                response
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .send({ message: "problem in getting polls" });
            } else {
                response.status(StatusCodes.OK).send(result);

            }
        });
    } catch (error) {
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}

// // Get Single Poll with Candidatesl
// export function getPoll(request, response) {
//     try {
//         const { id } = request.params;
//         const adminId = request.user.id;

//         // First query: Get poll details
//         const pollQuery = "SELECT * FROM polls WHERE id = ? AND admin_id = ?";
//         conn.query(pollQuery, [id, adminId], (pollError, pollResults) => {
//             if (pollError) {
//                 console.error("Poll query error:", pollError);
//                 response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
//                     error: "Failed to retrieve poll information",
//                 });
//             } else {
//                 if (pollResults.length === 0) {
//                     response.status(StatusCodes.NOT_FOUND).send({
//                         error: "Poll not found or unauthorized access",
//                     });
//                 }

//                 // Second query: Get candidates for the poll
//                 const candidateQuery = "SELECT * FROM candidates WHERE poll_id = ?";
//                 db.query(candidateQuery, [id], (candidateError, candidateResults) => {
//                     if (candidateError) {
//                         console.error("Candidate query error:", candidateError);
//                         response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
//                             error: "Failed to retrieve candidate information",
//                         });
//                     } else {
//                         response.status(StatusCodes.OK).send({
//                             poll: pollResults[0],
//                             candidates: candidateResults,
//                             candidateCount: candidateResults.length,
//                         });
//                     }
//                 });
//             }
//         });
//     } catch (error) {
//         console.error("Unexpected error in getPoll:", error);
//         return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
//             error: "An unexpected error occurred while processing your request",
//         });
//     }
// }

// Update Poll
// export function updatePoll(request, response) {
//     try {
//         const { id } = request.params.id;
//         const { name, start_date, end_date, is_active } = request.body;
//         const adminId = request.user.id;

//         // Verify poll exists and belongs to admin
//         const verifyQuery = "SELECT * FROM polls WHERE id = ? AND admin_id = ?";
//         conn.query(verifyQuery, [id, adminId], (verifyError, verifyResults) => {
//             if (verifyError) {
//                 console.error("Database error:", verifyError);
//                 return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//                     error: "Failed to verify poll ownership",
//                 });
//             }

//             if (verifyResults.length === 0) {
//                 return response.status(StatusCodes.NOT_FOUND).json({
//                     error: "Poll not found or unauthorized access",
//                 });
//             }

//             // Check if poll has votes when changing active status
//             const checkVotes = () => {
//                 return new Promise((resolve, reject) => {
//                     if (typeof is_active === "undefined") {
//                         return resolve(true);
//                     }

//                     conn.query(
//                         "SELECT COUNT(*) as vote_count FROM votes WHERE poll_id = ?",
//                         [id],
//                         (voteError, voteResults) => {
//                             if (voteError) {
//                                 console.error("Vote check error:", voteError);
//                                 return reject(voteError);
//                             }
//                             if (voteResults[0].vote_count > 0) {
//                                 return reject(new Error("Poll has existing votes"));
//                             }
//                             resolve(true);
//                         }
//                     );
//                 });
//             };

//             checkVotes()
//                 .then(() => {
//                     // Perform the update
//                     const updateQuery = `UPDATE polls SET name = ?, start_date = ?, end_date = ?, is_active = ? WHERE id = ?`;
//                     const values = [name, start_date, end_date, is_active, id];

//                     conn.query(updateQuery, values, (updateError, updateResult) => {
//                         if (updateError) {
//                             console.error("Update error:", updateError);
//                             return response
//                                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
//                                 .send({ error: "Failed to update poll" });
//                         } else {
//                             return response.status(StatusCodes.OK).json({
//                                 message: "Poll updated successfully",
//                                 updatedFields: {
//                                     name,
//                                     start_date,
//                                     end_date,
//                                     is_active,
//                                 },
//                             });
//                         }
//                     });
//                 })
//                 .catch((error) => {
//                     if (error.message === "Poll has existing votes") {
//                         return response.status(StatusCodes.FORBIDDEN).json({
//                             error: "Cannot change active status of a poll with votes",
//                         });
//                     }
//                     console.error("Error in vote check:", error);
//                     return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//                         error: "Failed to verify poll status",
//                     });
//                 });
//         });
//     } catch (error) {
//         console.error("Unexpected error in updatePoll:", error);
//         return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             error: "An unexpected error occurred",
//         });
//     }
// }


export async function updatePoll(request, response) {


    try {
        const id = parseInt(request.params.id);
        const { name, start_date, end_date, is_active } = request.body;
        const adminId = request.user.id;
        console.log(adminId);
        // Verify poll exists and belongs to admin
        const qry = "SELECT * FROM polls WHERE Id = ? AND admin_Id = ?";
        const [results] = await conn.promise().query(qry, [id, adminId]);

        if (results.length === 0) {
            return response.status(StatusCodes.NOT_FOUND).send({
                error: "Poll not found or unauthorized access",
            });
        }

        // Check if poll has votes when trying to change is_active
        if (typeof is_active !== "undefined") {
            const [voteResults] = await conn.promise().query("SELECT COUNT(*) AS vote_count FROM votes WHERE poll_id = ?",
                [id]
            );

            if (voteResults[0].vote_count > 0) {
                return response.status(StatusCodes.FORBIDDEN).send({
                    error: "Cannot change active status of a poll with votes",
                });
            }
        }

        // Perform the update
        const updateQuery = `
            UPDATE polls 
            SET name = ?, start_date = ?, end_date = ?, is_active = ?
            WHERE id = ?
        `;
        const values = [name, start_date, end_date, is_active, id];
        await conn.promise().query(updateQuery, values);

        return response.status(StatusCodes.OK).send({
            message: "Poll updated successfully",
            updatedFields: { name, start_date, end_date, is_active },
        });

    } catch (error) {
        console.error("Error in updating poll:", error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: "An unexpected error occurred",
        });
    }
}






// Delete Poll
export function deletePoll(request, response) {
    try {
        const id = parseInt(request.params.id);
        const adminId = request.user.id;
        console.log(id ,"   ->  ",adminId)

        // Verify poll exists and belongs to admin
        const qry = "SELECT * FROM polls WHERE id = ? AND admin_id = ?";
        conn.query(qry, [id, adminId], (error, results) => {
            if (error) {
                response.status(StatusCodes.NOT_FOUND).send({
                    error: "Poll not found or unauthorized access",
                });
            } else {

                if (results.length === 0) {
                    response.status(StatusCodes.NOT_FOUND).send({
                        error: "Poll not found or unauthorized access",
                    });
                } else {

                    // Check number of voters
                    const voteCountQuery = "SELECT COUNT(*) AS voteCount FROM votes WHERE id = ?";
                    conn.query(voteCountQuery, [id], (err, voteResult) => {
                        if (err) {
                            console.error("Error checking vote count:", err);
                            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Database error" });
                        }
                        else {
                            const voteCount = voteResult[0].voteCount;
                            if (voteCount > 0) {
                                console.log(`Poll ID ${Id} has ${voteCount} votes. Cannot delete.`);
                                response.status(StatusCodes.FORBIDDEN).send({ message: "Poll has votes, cannot delete.", voteCount : voteCount  });
                            } else {
                                conn.query("DELETE FROM polls WHERE id = ?", [id], (err, deleteResult) => {
                                    if (err) {
                                        console.error("Error deleting poll:", err);
                                        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Failed to delete poll" });
                                    }else{

                                         response.status(StatusCodes.OK).send({ message: "Poll deleted successfully." });
                                    }
                        });

                            }
                        }
                    });
                }
            }
        });
    } catch (error) {
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}

// Candidate Management
export function addCandidate(req, res) {
    try {
        const  poll_id  = parseInt(req.params.id);
        const { name, description, photo_url } = req.body;
        const adminId = req.user.id;

        // Verify poll exists and belongs to admin
        conn.query("SELECT * FROM polls WHERE id = ? AND admin_id = ?",[poll_id, adminId],
            (err, results) => {
                if (err) {
                    return res.status(StatusCodes.NOT_FOUND).send({
                    error: "something wrong...!",
                })
                }

                if (results.length === 0) {
                     return res.status(StatusCodes.NOT_FOUND).send({
                        error: "Poll not found or unauthorized access",
                    });
                }

                conn.query("INSERT INTO candidates (poll_id, name, description, photo_url) VALUES (?, ?, ?, ?)",
                    [poll_id, name, description, photo_url],
                    (err, result) => {
                        if (err)  return res.status(StatusCodes.FORBIDDEN).send({
                        error: "unable to add candidates poll",
                    });

                        res.status(StatusCodes.OK).send({
                            message: "Candidate added successfully",
                            candidateId: result.insertId,
                        });
                    }
                );
            }
        );
    } catch (err) {
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}

// Update Candidate
export function updateCandidate(req, res) {
    try {
        const { poll_id, candidate_id } = req.params;
        const { name, description, photo_url } = req.body;
        const adminId = req.user.id;

        // Verify poll exists and belongs to admin
        conn.query(
            "SELECT * FROM polls WHERE id = ? AND admin_id = ?",
            [poll_id, adminId],
            (err, results) => {
                if (err) return res.status(StatusCodes.NOT_FOUND).send({
                        error: "something goes wrong..",
                    });

                if (results.length === 0) {
                    return res.status(StatusCodes.NOT_FOUND).send({
                        error: "Poll not found or unauthorized access",
                    });
                }

                // Check if poll is active
                if (results[0].is_active) {
                    return res.status(StatusCodes.FORBIDDEN).send({
                        error: "Cannot modify candidates in an active poll",
                    });
                }

                conn.query(
                    "UPDATE candidates SET name = ?, description = ?, photo_url = ? WHERE id = ? AND poll_id = ?",
                    [name, description, photo_url, candidate_id, poll_id],
                    (err, result) => {
                        if (err) return handleDbError(err, res);

                        if (result.affectedRows === 0) {
                            return res.status(StatusCodes.NOT_FOUND).send({
                                error: "Candidate not found",
                            });
                        }

                        res.status(StatusCodes.OK).send({
                            message: "Candidate updated successfully",
                        });
                    }
                );
            }
        );
    } catch (err) {
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Something went wrong" });
    }
}

// // Delete Candidate
// export function deleteCandidate(req, res) {
//     try {
//         const { poll_id, candidate_id } = req.params;
//         const adminId = req.user.id;

//         // Verify poll exists and belongs to admin
//         db.query(
//             "SELECT * FROM polls WHERE id = ? AND admin_id = ?",
//             [poll_id, adminId],
//             (err, results) => {
//                 if (err) return handleDbError(err, res);

//                 if (results.length === 0) {
//                     return res.status(StatusCodes.NOT_FOUND).json({
//                         error: "Poll not found or unauthorized access",
//                     });
//                 }

//                 // Check if poll is active
//                 if (results[0].is_active) {
//                     return res.status(StatusCodes.FORBIDDEN).json({
//                         error: "Cannot delete candidates from an active poll",
//                     });
//                 }

//                 // Check if candidate has votes
//                 db.query(
//                     "SELECT COUNT(*) as vote_count FROM votes WHERE candidate_id = ?",
//                     [candidate_id],
//                     (err, voteResults) => {
//                         if (err) return handleDbError(err, res);

//                         if (voteResults[0].vote_count > 0) {
//                             return res.status(StatusCodes.FORBIDDEN).json({
//                                 error: "Cannot delete a candidate with votes",
//                             });
//                         }

//                         db.query(
//                             "DELETE FROM candidates WHERE id = ? AND poll_id = ?",
//                             [candidate_id, poll_id],
//                             (err, result) => {
//                                 if (err) return handleDbError(err, res);

//                                 if (result.affectedRows === 0) {
//                                     return res.status(StatusCodes.NOT_FOUND).json({
//                                         error: "Candidate not found",
//                                     });
//                                 }

//                                 res.status(StatusCodes.OK).json({
//                                     message: "Candidate deleted successfully",
//                                 });
//                             }
//                         );
//                     }
//                 );
//             }
//         );
//     } catch (err) {
//         response
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .send({ message: "Something went wrong" });
//     }
// }

// Get Poll Results

export function getPollResults(req, res) {
  const pollId = parseInt(req.params.id);
  const adminId = req.user.id;

  // Step 1: Verify poll exists and belongs to admin
  const qry = "SELECT * FROM polls WHERE id = ? AND admin_id = ?";
  conn.query(qry, [pollId, adminId], (err, pollResult) => {
    if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Database error" });
    if (pollResult.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: "Poll not found or unauthorized" });
    }

    // Step 2.1: Get total vote count for this poll
    const totalVoteSql = `SELECT COUNT(*) AS totalVotes FROM votes WHERE poll_id = ?`;
    conn.query(totalVoteSql, [pollId], (err, totalResult) => {
      if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error counting total votes" });

      const totalVotes = totalResult[0].totalVotes || 0;

      // Step 2.2: Get candidate vote counts
      const candidateSql = `
        SELECT c.id, c.name, c.description, c.photo_url, 
               COUNT(v.id) AS votes
        FROM candidates c
        LEFT JOIN votes v ON c.id = v.candidate_id
        WHERE c.poll_id = ?
        GROUP BY c.id
        ORDER BY votes DESC
      `;

      conn.query(candidateSql, [pollId], (err, candidates) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error fetching results" });

        // Add percentage to each candidate
        const results = candidates.map(c => ({
          ...c,
          percentage: totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(2) : '0.00'
        }));

        res.status(StatusCodes.OK).json({
          poll: pollResult[0],
          results,
          totalVotes,
        });
      });
    });
  });
}
