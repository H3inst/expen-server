CREATE DATABASE expen-db;

CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

CREATE TABLE activities (
    activity_id VARCHAR (255) PRIMARY KEY NOT NULL,
    activity_type VARCHAR (255) NOT NULL,
    activity_desc TEXT NOT NULL,
    activity_ammount FLOAT NOT NULL,
    activity_category TEXT,
    activity_date TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
);