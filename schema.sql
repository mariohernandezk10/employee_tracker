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
--   to hold reference to department role belongs to
  department_id int,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
--   INT to hold reference to role employee has
  role_id int,
-- to hold reference to another employee that 
-- manages the employee being Created. This field 
-- may be null if the employee has no manager
  manager_id int,
  PRIMARY KEY (id)
);

insert into department(name) values("Human Resources");
insert into department(name) values("Developers");

insert into role(title, salary, department_id) values("Counselor", 50000, 1);
insert into role(title, salary, department_id) values("Payroll", 50000, 1);
insert into role(title, salary, department_id) values("Full Stack Developer", 80000, 2);
insert into role(title, salary, department_id) values("Project Manager", 100000, 2);

insert into employee(first_name, last_name, role_id, manager_id) values("Mario", "Hernandez", 2, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Ferd", "Dallas", 2, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Chid", "Houston", 2, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Austin", "Texas", 2, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Drake", "Canada", 2, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Curtis", "Jackson", 2, 1);

UPDATE roles SET title = 'title', salary= '100000' WHERE department_id = 1;
UPDATE employee SET last_name = 'last_name', City= 'Frankfurt' WHERE role_id = 1;