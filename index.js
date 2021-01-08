var mysql = require("mysql2");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employeeTracker_DB"
});

connection.connect(async function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log('connected as id ' + connection.threadId);
    await start();
    connection.end();

});

// Functions to VIEW
// 1. VIEW Departments
// 2. VIEW Roles
// 3. VIEW Employees
async function viewEmployee() {
    const SQL_STATEMENT = 'select * from employee;';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}

async function viewDepartment() {
    const SQL_STATEMENT = 'select * from department;';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}

async function viewRole() {
    const SQL_STATEMENT = 'select * from role;';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);

};

// Functions to ADD
// 1. ADD Departments

// the code below is the SQL statement to create a department
// insert into department(name) values("Developers");

// 2. ADD Roles
// 3. ADD Employees
async function start() {
    const {
        choice
    } = await inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "What do you want to do?",
        // put these in variables
        choices: ["View Employee", "View Employee with manager id"]
    })
    console.log(choice);
    switch (choice) {
        // reference variables here
        case "View Employee":
            viewEmployee();
            break;
    }
}

// Functions to UPDATE
// 1. UPDATE Roles
// 2. UPDATE Employees




//Bonus points if you're able to:
// * Update employee managers
// * View employees by manager
// * Delete departments, roles, and employees
// * View the total utilized budget of a department 
// ie the combined salaries of all employees in that department