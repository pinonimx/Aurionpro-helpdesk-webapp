CREATE DATABASE IF NOT EXISTS aurionpro;

USE aurionpro;

CREATE TABLE IF NOT EXISTS category (
    id int(10) unsigned NOT NULL auto_increment,
    category varchar(255) NOT NULL,
    unique key `category` (`category`),
    primary key(id)
);
desc category;