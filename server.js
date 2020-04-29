const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

//set up connection to MySQL
var connection = mysql.createConnection({
   ${prod.env};
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    
    console.log("Successfully connected as id " + connection.threadId);
    // afterConnect();
  });