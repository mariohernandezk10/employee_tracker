async function viewRole() {
    const SQL_STATEMENT = 'select * from role;';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);

};

async function viewEmployee() {
    const SQL_STATEMENT = 'select * from employee;';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}


async function addRole() {
    const SQL_STATEMENT = 'insert into role(title, salary, department_id) values("Counselor", 50000, 1);';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}

async function addEmployee() {
    const SQL_STATEMENT = 'insert into employee(first_name, last_name, role_id, manager_id) values("Mario", "Hernandez", 2, 1);';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}


async function addDepartment() {
    const SQL_STATEMENT = 'insert into department(name) values("Human Resources");';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}



async function updateEmployees() {
    const SQL_STATEMENT = 'UPDATE employee SET last_name = "last_name", City= "Frankfurt" WHERE role_id = 1;';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}

async function updateRoles() {
    const SQL_STATEMENT = 'UPDATE roles SET title = "title", salary= "100000" WHERE department_id = 1;';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}


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
    }]).then(function (answer) {

        var name = answer[0].employeeName;
        var last_name = answer[1].lastName;
        var role_id = answer[2].roleId;
        var manager_id = answer[3].managerId;

        connection.query(`INSERT INTO employeeTracker_DB.employee (first_name, last_name, role_id, manager_id) VALUES ('${name}', '${last_name}', '${role_id}', '${manager_id}')`, function (err) {
            if (err) throw err;
            viewEmployee();
            start();
        })
    })
}