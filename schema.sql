CREATE TABLE movie_booking(
	user_id int AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    movie_name VARCHAR(20) not null,
    seat_no VARCHAR(10) not null unique    
);

CREATE TABLE voters (
  voter_id INT AUTO_INCREMENT PRIMARY KEY,
  adhar_no VARCHAR(12) NOT NULL UNIQUE,
  voter_name VARCHAR(100) NOT NULL,
  voter_email VARCHAR(100) NOT NULL,
  voter_dob DATE NOT NULL
);

CREATE TABLE polls (
  poll_id INT AUTO_INCREMENT PRIMARY KEY,
  poll_title VARCHAR(255) NOT NULL,
  poll_description TEXT,
  poll_deadline DATETIME NOT NULL
);
CREATE TABLE poll_options (
  option_id INT AUTO_INCREMENT PRIMARY KEY,
  poll_id INT NOT NULL,
  option_text VARCHAR(255) NOT NULL,
  FOREIGN KEY (poll_id) REFERENCES polls(poll_id)
);
CREATE TABLE votes (
  vote_id INT AUTO_INCREMENT PRIMARY KEY,
  voter_id INT NOT NULL,
  poll_id INT NOT NULL,
  option_id INT NOT NULL,
  vote_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (voter_id, poll_id), -- ensures one vote per poll
  FOREIGN KEY (voter_id) REFERENCES voters(voter_id),
  FOREIGN KEY (poll_id) REFERENCES polls(poll_id),
  FOREIGN KEY (option_id) REFERENCES poll_options(option_id)
);