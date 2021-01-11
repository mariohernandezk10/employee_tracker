DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary decimal,
  department_id int,
  PRIMARY KEY (id), 
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id int NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INTEGER NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

ALTER TABLE employee
DROP CONSTRAINT employee_ibfk_1;

insert into department(name) values("Human Resources");
insert into department(name) values("Developers");

insert into role(title, salary, department_id) values("Counselor", 50000, 1);
insert into role(title, salary, department_id) values("Payroll", 50000, 1);
insert into role(title, salary, department_id) values("Full Stack Developer", 80000, 2);
insert into role(title, salary, department_id) values("Project Manager", 100000, 2);

insert into employee(first_name, last_name, role_id, manager_id) values("Mario", "Hernandez", 1, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Ferd", "Dallas", 2, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Mike", "Tyson", 3, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Austin", "Texas", 4, 1);
