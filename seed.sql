USE employee_db;


INSERT INTO department (dept_name)
VALUES ("HR");

INSERT INTO department (dept_name)
VALUES ("Production");

INSERT INTO department (dept_name)
VALUES ("Engineering");

INSERT INTO department (dept_name)
VALUES ("Sanitation");

INSERT INTO roles (title, salary, dept_id)
VALUES ("Manager", 75000, 1);

INSERT INTO roles (title, salary, dept_id)
VALUES ("Supervisor", 50000, 2);

INSERT INTO roles (title, salary, dept_id)
VALUES ("Associate", 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sophia", "Green", 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ted", "Maximus", 3, null);