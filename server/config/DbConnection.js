import { createConnection } from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const conn = createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

conn.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DB connected...!");
  }
});

export function getDBConnection() {
  return conn;
}
