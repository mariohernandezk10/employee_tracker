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

function whichRole() {
    connection.query(`select * from role`, function (err, rows) {
        if (err) throw err;
        // console.table(rows);
        // console.table(rows[0]);
        // console.table(rows[0].title);
        let choices = [];
        for (let i = 0; i < rows.length; i++) {
            console.table(rows[i].title);
            let title = rows[i].title;
            // let salary = rows[i].salary;
            // let id = rows[i].id;
            choices.push(title);
            console.log(choices)
            // choices.push(salary);
            // choices.push(id);


        }
        let salary = rows[i].salary;
        console.log(salary)
        
// the point of this function below is to use the current choices and create a prompt
// I moved this function outside the for loop 
        createUsingChoices(choices, salary, id);
    })
}

function createUsingChoices(arrayOfChoices, salary, id) {
    inquirer.prompt({
        name: "roles",
        type: "rawlist",
        choices: arrayOfChoices
    }).then(function (answer) {
        let employeeToBe = answer.roles;
        console.log(employeeToBe);
        connection.query(`UPDATE role SET title = '${employeeToBe}', salary= '${salary}' WHERE role(id) = ${id};
        `, function (err) {
            if (err) throw err;
            viewRole();
            // start();
        })
    })
}



function updateRole() {
    inquirer.prompt([{
            name: "roleId",
            type: "input",
            message: "What is the role ID?"
        },
        {
            name: "employeeId",
            type: "number",
            message: "What is the emloyee ID?"
        }
    ]).then(function (answers) {
        console.log("Role has been Updated...\n");
        connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{
                    role_id: answers.role_id
                },
                {
                    id: answers.employee_id
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " products updated!\n");
                // Call deleteProduct AFTER the UPDATE completes
            })
        // console.log(query.sql);
    })
}
