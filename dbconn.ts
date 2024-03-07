import mysql from "mysql";

export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "sql6.freemysqlhosting.net",
  user: "sql6689411",
  password: "Zk2EdjcRml",
  database: "sql6689411",
});