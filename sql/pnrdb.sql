
CREATE DATABASE IF NOT EXISTS pnrdb;
USE pnrdb;

CREATE TABLE IF NOT EXISTS tcs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeNumber VARCHAR(50),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS passengers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pnr VARCHAR(20),
  name VARCHAR(100),
  phone VARCHAR(15),
  status ENUM('confirmed', 'waiting', 'absent') DEFAULT 'waiting'
);

INSERT INTO tcs (employeeNumber, password) VALUES ('TC001', 'tc123');

INSERT INTO passengers (pnr, name, phone, status) VALUES
('PNR001', 'Alice', '+1111111111', 'confirmed'),
('PNR002', 'Bob', '+1222222222', 'waiting'),
('PNR003', 'Charlie', '+1333333333', 'waiting');
