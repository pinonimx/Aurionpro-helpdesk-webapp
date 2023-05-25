CREATE DATABASE IF NOT EXISTS aurionpro;

USE aurionpro;

CREATE TABLE IF NOT EXISTS ticketdata (
    id varchar(10) NOT NULL,
    state varchar(30) not null,
    bankname varchar(30) not null,
    personname varchar(255) not null,
    assigneeemail varchar(255) default null,
    mobilenum varchar(10) default null,
    title varchar(255) not null,
    priority varchar(30) default 'Normal',
    category varchar(30) default null,
    type varchar(20) default null,
    assignto varchar(30) default null,
    status varchar(30) default 'Waiting for support',
    created datetime,
    link varchar(255) default null,
    description varchar(255) default null,
    primary key(id)
);
desc ticketdata;