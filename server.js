const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
require('dotenv').config();

//set up connection to MySQL
var connection = mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

});
  
  connection.connect(function(err) {
    if (err) throw err;
    
    console.log("Successfully connected as id " + connection.threadId);
    employeeQ();
  });

  //function for asking questions

  function employeeQ() {
      inquirer.prompt({
          name: "choice1",
          type: "list",
          message: "Select from the options below:",
          choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Departments",
            "View Roles",
            "View Employees",
            "Update Employee",
            "Exit"
          ]
      })

      .then(response => {
          const selection = response.choice1;
          switch(selection) {

            //add employee
            case "Add Employee":
                connection.query(
                    inquirer.prompt([
                    {
                        type: "input",
                        name: "firstName",
                        message: "What is the employee's first name?"
                    },

                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the employee's first name?"
                    },

                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employee's first name?"
                    },                
                    
                    {
                        type: "list",
                        name: "role_id",
                        message: "What is the employee's role?",
                        choices: () => roles.map(roles => `${roles.id} ${roles.title}`)
                    },

                    {
                        type: "list",
                        name: "manager_id",
                        message: "Who is the employee's Manager?",
                        choices: () => employee.map(employee => `${employee.id} ${employee.name}`)
                    }
                ])
                .then(answer => {
                    connection.query("INSERT INTO employee SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: parseInt(answer.role_id),
                        manager_id: parseInt(answer.manager_id)
                    },
                    function(err) {
                        if (err) throw err;
                        console.log(`${answer.first_name} ${answer.last_name} was added to the database`);

                        connection.query("SELECT * FROM employee", function(err, response) {
                            if (err) throw err;
                            console.table(response);
                            employeeQ();
                        })
                    })
                })
            )
                break;

            case "View Departments":
                connection.query("SELECT * FROM department", function(err, response) {
                    if (err) throw err;
                    console.table(response);
                    employeeQ();
                });
                break;

            case "View Roles":
                connection.query("SELECT * FROM roles", function(err, response) {
                    if (err) throw err;
                    console.table(response);
                    employeeQ();
                });
                break;  
            
            case "View Employees":
                connection.query("SELECT * FROM employee", function(err, response) {
                    if (err) throw err;
                    console.table(response);
                    employeeQ();
                });
                break;     
          
          
          
          
          
          
          
          
          
          
          
          
          }
      })
  }