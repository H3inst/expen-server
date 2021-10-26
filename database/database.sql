CREATE DATABASE expen-db;

CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

CREATE TABLE registers (
    register_id VARCHAR (255) PRIMARY KEY NOT NULL,
    register_desc TEXT NOT NULL,
    register_ammount FLOAT NOT NULL,
    register_category TEXT,
    register_date TIMESTAMP
);