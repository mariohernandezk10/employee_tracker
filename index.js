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
    start();
    // connection.end();

});

// Functions to VIEW
function viewDepartment() {
    // const SQL_STATEMENT = 'select * from department;';
    // const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    connection.query(`select * from department`, function (err, rows) {
        if (err) throw err;
        console.table(rows);
        start();
    })
}

function viewEmployee() {
    // const SQL_STATEMENT = 'select * from department;';
    // const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    connection.query(`select * from employee`, function (err, rows) {
        if (err) throw err;
        console.table(rows);
        start();
    })
}

function viewRole() {
    // const SQL_STATEMENT = 'select * from department;';
    // const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    connection.query(`select * from role`, function (err, rows) {
        if (err) throw err;
        console.table(rows);
        start();
    })
}

// Functions to ADD
function addDepartment() {
    inquirer.prompt({
        name: "departmentName",
        type: "input",
        message: "What is the name of the department you want?"
    }).then(function (answer) {
        var name = answer.departmentName;
        console.log(name);
        connection.query(`INSERT INTO employeeTracker_DB.department (name) VALUES ('${name}')`, function (err) {
            if (err) throw err;
            viewDepartment();
            // start();
        })
    })
}

// ALSO NEED TO ADD MORE QUESTIONS FIRST_NAME LAST_NAME ROLE_ID AND MANAGER_ID
function addEmployee() {
    inquirer.prompt([{
            name: "employeeName",
            type: "input",
            message: "What is the name of the employee?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "roleId",
            type: "number",
            message: "What is the role id of the employee?"
        },
        {
            name: "managerId",
            type: "number",
            message: "What is the manager id of the employee?"
        }
    ]).then(function (answer) {

        var name = answer.employeeName;
        var last_name = answer.lastName;
        var role_id = answer.roleId;
        var manager_id = answer.managerId

        connection.query(`INSERT INTO employeeTracker_DB.employee (first_name, last_name, role_id, manager_id) VALUES ('${name}', '${last_name}', '${role_id}', '${manager_id}')`, function (err) {
            if (err) throw err;
            viewEmployee();
            // start();
        })
    })
}

// ALSO NEED TO ADD MORE QUESTIONS i.e TITLE SALARY AND DEPARTMENT_ID
function addRole() {
    inquirer.prompt([{
            name: "title",
            type: "input",
            message: "What is the title of the employee?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the employee?"
        },
        {
            name: "departmentId",
            type: "number",
            message: "What is the department ID of the employee?"
        }
    ]).then(function (answer) {

        // create and if statement that doesn't allow the user to input anything else but a NUMBER
        var title = answer.title;
        var salary = answer.salary;
        var department_id = answer.departmentId;

        connection.query(`INSERT INTO employeeTracker_DB.role (title, salary, department_id) VALUES ('${title}', '${salary}', '${department_id}')`, function (err) {
            if (err) throw err;
            viewRole();
            // start();
        })
    })
}


function start() {
    inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "What do you want to do?",
        // put these in variables
        choices: ["View Department", "View Employee", "View Roles", "ADD Department", "ADD Employee", "ADD Role", "UPDATE Employee Role", "Show Employee"]
    }).then(function (res) {
        switch (res.choice) {
            // reference variables here
            case "View Department":
                viewDepartment();
                break;
            case "ADD Department":
                addDepartment();
                break;
            case "View Employee":
                viewEmployee();
                break;
            case "View Roles":
                viewRole();
                break;
            case "ADD Employee":
                addEmployee();
                break;
            case "ADD Role":
                addRole();
                break;
            case "UPDATE Employee Role":
                updateRole();
                // updateRole();
                break;
            case "Show Employee":
                showEmployee();
                break;
        }
    })
}


// Functions to UPDATE Role
function updateRole() {
    inquirer.prompt([{
        name: "employeeId",
        type: "number",
        message: "What is the emloyee ID?"
    }, 
    {
        name: "roleId",
        type: "input",
        message: "What is the role ID?"
    }
]).then(function (answers) {
        connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{
                    role_id: answers.roleId
                },
                {
                    id: answers.employeeId
                }
            ],
            function (err, res) {
                if (err) throw err;
                viewRole();
            })
    })
}

function showEmployee() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;`, function (err, rows) {
        if (err) throw err;
        console.table(rows);
        start();
    })
}



//Bonus points if you're able to:

// Functions to Delete
// 1. DELETE departments
// 2. DELETE roles
// 3. DELETE employees