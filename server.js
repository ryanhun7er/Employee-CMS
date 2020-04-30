const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
require('dotenv').config();

//set up connection to MySQL
const connection = mysql.createConnection({
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
      }).then(response => {
          const selection = response.choice1;
          switch(selection) {
            
            //add department
            case "Add Department":
                connection.query("SELECT * FROM department", function(err, response) {
                    if(err) throw err;
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "dept_name",
                            message: "Which department would you like to add?"
                        },
                    ]).then(answer => {
                        connection.query("INSERT INTO department SET ?",
                        {
                            name: answer.dept_name
                        },
                        connection.query("SELECT * FROM department", function(err, response) {
                            if(err) throw err;
                            console.table(response);
                            employeeQ();
                        }))
                    })
                });
                break;
            
            //add roles
            case "Add Role":
                connection.query("SELECT * FROM department", function(err, response) {
                    if(err) throw err;
                    inquirer.prompt([
                        {
                            name: "title",
                            type: "input",
                            message: "What role would you like to add?",

                        },

                        {
                            name: "salary",
                            type: "input",
                            message: "Input salary for this role"
                        },

                        {
                            name: "dept_id",
                            type: "input",
                            message: "Select the department for this role",
                            choices: () => response.map(department => `${department.id} ${department.name}`)

                        }
                    ]).then(answer => {
                        connection.query("INSERT INTO roles SET ?",
                        {
                            title: answer.title,
                            salary: answer.salary,
                            dept_id: answer.department_id
                        },
                        function(err) {
                            if(err) throw err;
                        
                        console.log(`${answer.title} added to database`);
                        connection.query("SELECT * FROM roles", function(err, response) {
                            if(err) throw err;
                            console.table(response);
                            employeeQ();
                        })
                    })
                })
            });
            break;

            //add employee
            case "Add Employee":
                connection.query("SELECT * FROM roles", function(err, response) {
                    if(err) throw err;               }
                    ,inquirer.prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the employee's first name?"
                    },

                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employee's last name?"
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
            ;
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
          
            case "Finish":
                connection.end();
                    break;
                    default: 
                    break;
          
          
          
          
          
          
          
          
          
          
          }
      })
  }