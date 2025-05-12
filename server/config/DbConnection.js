import { createConnection } from "mysql2";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const conn = createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});
const app = express();

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
