DROP DATABASE IF EXISTS ASA;
CREATE DATABASE IF NOT EXISTS ASA;
USE ASA;


CREATE TABLE IF NOT EXISTS users(
    user_id INT(4) AUTO_INCREMENT,
    user_name varchar(50) NOT NULL,
    user_pswd varchar(50) NOT NULL,
    PRIMARY KEY(user_id)
);


CREATE TABLE IF NOT EXISTS articles(
    artic_id INT(4) AUTO_INCREMENT,
    image_name varchar(200) NOT NULL,
    artic_name varchar(200) NOT NULL,
    artic_descr varchar(200) NOT NULL,
    PRIMARY KEY(artic_id)
);


CREATE TABLE IF NOT EXISTS categories(
    categ_id INT(4) AUTO_INCREMENT,
    artic_categ varchar(200) NOT NULL,
    PRIMARY KEY(categ_id)
);


CREATE TABLE IF NOT EXISTS cat_art(
    artic_id INT(4) NOT NULL,
    categ_id INT(4) NOT NULL,


    FOREIGN KEY (artic_id)
        REFERENCES articles(artic_id)
        ON DELETE CASCADE,


    FOREIGN KEY (categ_id)
        REFERENCES categories(categ_id)
        ON DELETE CASCADE
);


source load_usr.dump
source load_categ.dump
