/* eslint-disable @typescript-eslint/ban-types */
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL ?? '');

export function showTables() {
  // simple query
  connection.query('show tables', function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra metadata about results, if available
  });
}

// Use later
// export function importAccounts() {
//   console.table(accounts);
//   const query = `INSERT INTO users (discordID, username, credits, email, isUnlimited) VALUES ?`;
//   const values = accounts.map(item => {
//     const value = [item.discordID, item.username, item.credits, 'null', false];

//     return value;
//   });
//   connection.query(query, [values], (err, results, fields) => {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra metadata about results, if available
//     console.log(err);
//   });
// }

export function runQuery(
  query: string,
  values: [string] | undefined,
  callback: Function
) {
  const results = connection.query(query, values, (err, results) => {
    if (err) {
      throw err;
    }
    return callback(results);
  });
  return results;
}

export function closeConnection() {
  connection.end();
}
