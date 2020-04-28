const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

//set up connection to MySQL
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Nashvegas22",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    
    console.log("Successfully connected as id " + connection.threadId);
    // afterConnect();
  });