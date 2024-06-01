CREATE TABLE IF NOT EXISTS calendars (
	calendar_id INT NOT NULL UNIQUE AUTO_INCREMENT,
	calendar_name varchar(50) NOT NULL,
	calendar_color varchar(8) NOT NULL,
	calendar_icon varchar(100) NOT NULL,
	calendar_id_public varchar(50) NOT NULL,
	calendar_user_id INT NOT NULL,
	PRIMARY KEY (calendar_id)
);

CREATE TABLE IF NOT EXISTS users (
	user_id INT NOT NULL UNIQUE AUTO_INCREMENT,
	user_id_public varchar(50) NOT NULL,
	user_email varchar(50) NOT NULL,
	user_username varchar(50),
	user_image varchar(255),
	user_provider varchar(30),
	user_company varchar(30),
	user_name varchar(150) NOT NULL,
    user_password varchar(255),
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS events (
	event_id INT NOT NULL UNIQUE AUTO_INCREMENT,
	event_start DATETIME NOT NULL,
	event_end DATETIME NOT NULL,
	event_description varchar(150),
	event_location varchar(50),
	event_url varchar(50),
	event_name varchar(50) NOT NULL,
	event_id_public varchar(50) NOT NULL,
	calendar_id INT NOT NULL,
	PRIMARY KEY (event_id)
);

ALTER TABLE calendars ADD CONSTRAINT calendars_fk3 FOREIGN KEY (calendar_user_id) REFERENCES users(user_id);

ALTER TABLE events ADD CONSTRAINT events_fk8 FOREIGN KEY (calendar_id) REFERENCES calendars(calendar_id);
