CREATE DATABASE voting_system;

USE voting_system;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  q1 varchar(200),
  q2 varchar(200),
  q3 varchar(200),
  q4 int,
  q5 int,
  q6 int
);


CREATE TABLE voters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  adhar_no VARCHAR(12) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  dob DATE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  q1 varchar(200),
  q2 varchar(200),
  q3 varchar(200),
  q4 int,
  q5 int,
  q6 int
);

CREATE TABLE polls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  admin_id INT NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id)
  ,q1 varchar(200),
  q2 varchar(200),
  q3 varchar(200),
  q4 int,
  q5 int,
  q6 int
);

CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poll_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poll_id) REFERENCES polls(id),
  q1 varchar(200),
  q2 varchar(200),
  q3 varchar(200),
  q4 int,
  q5 int,
  q6 int
);

CREATE TABLE votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poll_id INT NOT NULL,
  candidate_id INT NOT NULL,
  voter_id INT NOT NULL,
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poll_id) REFERENCES polls(id),
  FOREIGN KEY (candidate_id) REFERENCES candidates(id),
  FOREIGN KEY (voter_id) REFERENCES voters(id),
  UNIQUE KEY (poll_id, voter_id),
  q1 varchar(200),
  q2 varchar(200),
  q3 varchar(200),
  q4 int,
  q5 int,
  q6 int
);
SELECT id, name, start_date, end_date, is_active FROM polls WHERE id = 3;
select * from polls;