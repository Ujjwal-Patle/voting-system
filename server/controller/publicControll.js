import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";

const conn = getDBConnection();

export function getAllActivePolls(req, res) {
  conn.query(
    `SELECT * FROM polls WHERE is_active = TRUE`,
    (err, pollResults) => {
      if (err) {
        console.error("Poll fetch error:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch polls' });
      }
      res.status(StatusCodes.OK).send(pollResults);
    }
  );
}

// Get specific poll with candidates
export function getPollDetails(req, res) {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid poll ID' });
  }

  conn.query(
    `SELECT * FROM polls WHERE id = ? AND is_active = TRUE`,
    [id],
    (err, pollResults) => {
      if (err) {
        console.error("Poll fetch error:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch poll' });
      }

      if (pollResults.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: 'Poll not found or not active' });
      }

      conn.query(
        'SELECT id, name, description, photo_url FROM candidates WHERE poll_id = ?',
        [id],
        (err, candidateResults) => {
          if (err) {
            console.error("Candidate fetch error:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch candidates' });
          }

          res.status(StatusCodes.OK).send({
            ...pollResults[0],
            candidates: candidateResults
          });
        }
      );
    }
  );
}