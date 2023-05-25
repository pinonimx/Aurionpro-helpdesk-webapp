CREATE DATABASE IF NOT EXISTS aurionpro;

USE aurionpro;

CREATE TABLE IF NOT EXISTS projecttype (
    id int(10) unsigned NOT NULL auto_increment,
    type varchar(255) NOT NULL,
    unique key `type` (`type`),
    primary key(id)
);
desc projecttype;