import { StatusCodes } from "http-status-codes";
import { getDBConnection } from "../config/DbConnection.js";

const conn = getDBConnection();

export function contact(req, res) {
    try {

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Name, email, and message are required' });
        }

        const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
        conn.query(query, [name, email, message], (err, result) => {
            if (err) {
                console.error('Error saving contact:', err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Failed to save contact' });
            }

            res.status(StatusCodes.CREATED).send({ message: 'Contact form submitted successfully', id: result.insertId });
        });

    } catch (error) {

    }
};