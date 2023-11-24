import mysql from 'mysql2';

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL ?? '');

export function showTables() {
  // simple query
  connection.query('show tables', function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra metadata about results, if available
  });
}

export function createDatabase() {
  connection.query('');
}
