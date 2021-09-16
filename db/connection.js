const util = require("util");
const mysql = require("mysql2");

// If you want to create a new db you have to delete old one, change the database name, update the schema and seed then run the NEW schema and seed in MySQL Workbench. Make it work there then "npm start"

// THE ONLY THING THAT CHANGES HERE IS THE "database" key ON LINE 10
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees"
});

connection.connect();

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
