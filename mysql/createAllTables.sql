CREATE DATABASE IF NOT EXISTS aurionpro;

CREATE TABLE IF NOT EXISTS `aurionpro`.`category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `category_UNIQUE` (`category` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `aurionpro`.`projecttype` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `aurionpro`.`ticketdata` (
  `id` VARCHAR(10) NOT NULL,
  `state` VARCHAR(45) NULL,
  `bankname` VARCHAR(45) NULL,
  `personname` VARCHAR(255) NULL,
  `assigneeemail` VARCHAR(255) NULL,
  `mobilenum` VARCHAR(20) NULL,
  `title` VARCHAR(500) NULL,
  `priority` VARCHAR(45) NULL DEFAULT 'Normal',
  `category` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `assignto` VARCHAR(255) NULL,
  `assigntoemail` VARCHAR(255) NULL,
  `status` VARCHAR(45) NULL DEFAULT 'Waiting for support',
  `created` DATETIME NOT NULL,
  `closed` DATETIME NULL,
  `closurecomment` VARCHAR(2000) NULL,
  `link` VARCHAR(255) NULL,
  `description` VARCHAR(5000) NULL,
  `district` VARCHAR(45) NULL,
  `tehshil` VARCHAR(45) NULL,
  `khasrano` VARCHAR(45) NULL,
  `village` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ticketdata_cat_idx` (`category` ASC) VISIBLE,
  INDEX `fk_ticketdata_type_idx` (`type` ASC) VISIBLE,
  CONSTRAINT `fk_ticketdata_cat`
    FOREIGN KEY (`category`)
    REFERENCES `aurionpro`.`category` (`category`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ticketdata_type`
    FOREIGN KEY (`type`)
    REFERENCES `aurionpro`.`projecttype` (`type`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `aurionpro`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `useremail` VARCHAR(255) BINARY NOT NULL,
  `mobilenum` VARCHAR(20) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) NULL DEFAULT 'User',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `useremail_UNIQUE` (`useremail` ASC) VISIBLE)
ENGINE = InnoDB;

use aurionpro;

delimiter //
create procedure test()
begin
SET @rowCount = (SELECT COUNT(*) FROM category);

IF @rowCount = 0 THEN
insert into category set `category` = 'Requirment from State';
insert into category set `category` = 'Master upload related cases';
insert into category set `category` = 'CCE app issue';
insert into category set `category` = 'Technical issue';
insert into category set `category` = 'Installation/Configuration';
insert into category set `category` = 'General inquiry';
insert into category set `category` = 'Feature request';
insert into category set `category` = 'Product feedback';
END IF;
end //

delimiter ;

call test();

delimiter //
create procedure test2()
begin
SET @rowCount2 = (SELECT COUNT(*) FROM projecttype);

IF @rowCount2 = 0 THEN
insert into projecttype set `type` = 'KCC-ISS';
insert into projecttype set `type` = 'PMFBY';
insert into projecttype set `type` = 'CCE';
END IF;
end //

delimiter ;

call test2();