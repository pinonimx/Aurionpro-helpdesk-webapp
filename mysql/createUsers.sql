CREATE DATABASE IF NOT EXISTS aurionpro;

USE aurionpro;

CREATE TABLE IF NOT EXISTS users (
    id int(10) unsigned NOT NULL auto_increment,
    useremail varchar(255) default null,
    mobilenum int(10) unsigned default null,
    username varchar(255) default null,
    password varchar(255) default null,
    role varchar(20) default 'User',
    primary key(id),
    unique key `useremail` (`useremail`)
);
desc users;