/* Check if the database exists */
DROP DATABASE IF EXISTS Badminton_Raptor_Store;
CREATE DATABASE Badminton_Raptor_Store;

/*Use the database*/
USE Badminton_Raptor_Store;

/*Create Tables*/
/* User Account Table */
CREATE TABLE user_account(
    profileImg TEXT NOT NULL,
    userID INT NOT NULL AUTO_INCREMENT,
    userRole VARCHAR(20) NOT NULL DEFAULT 'User',
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    email VARCHAR(45) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    gender VARCHAR(15) NOT NULL,
    age INT NOT NULL,
    race VARCHAR(15) NOT NULL,
    contactNum VARCHAR(15) NOT NULL,
    dob DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userID)
);

/*Equipment Table*/
CREATE TABLE equipment(
    equipID INT NOT NULL AUTO_INCREMENT,
    equipName VARCHAR(50) NOT NULL UNIQUE,
    equipCategory VARCHAR(50) NOT NULL,
    equipBrand VARCHAR(50) NOT NULL,
    equipImgPath TEXT NOT NULL,
    equipPrice DECIMAL (10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (equipID)
);

/*Equipment Details Table*/
CREATE TABLE racquet(
    equipID INT NOT NULL,
    flex VARCHAR(255),
    frame VARCHAR(255),
    shaft VARCHAR(255),
    joint VARCHAR(255),
    length VARCHAR(255),
    weight VARCHAR(255),
    stringAdvice VARCHAR(255),
    color VARCHAR(255),
    madeIn VARCHAR(255),
    PRIMARY KEY (equipID),
    FOREIGN KEY (equipID) REFERENCES equipment(equipID) ON DELETE CASCADE
);
CREATE TABLE shuttlecock (
    equipID INT NOT NULL,
    quantityPerTube INT,
    description TEXT,
    PRIMARY KEY (equipID),
    FOREIGN KEY (equipID) REFERENCES equipment(equipID) ON DELETE CASCADE
);
CREATE TABLE bags(
    equipID INT NOT NULL,
    color VARCHAR(255),
    size VARCHAR(255),
    description TEXT,
    PRIMARY KEY (equipID),
    FOREIGN KEY (equipID) REFERENCES equipment (equipID) ON DELETE CASCADE
);
CREATE TABLE footwear(
    equipID INT NOT NULL,
    color VARCHAR(255),
    upper VARCHAR(255),
    midsole VARCHAR(255),
    outsole VARCHAR(255),
    description TEXT,
    PRIMARY KEY (equipID),
    FOREIGN KEY (equipID) REFERENCES equipment (equipID) ON DELETE CASCADE
);
CREATE TABLE apparel(
    equipID INT NOT NULL,
    color VARCHAR(255),
    material VARCHAR(255),
    PRIMARY KEY (equipID),
    FOREIGN KEY (equipID) REFERENCES equipment (equipID) ON DELETE CASCADE
);
CREATE TABLE accessories(
    equipID INT NOT NULL,
    description TEXT,
    PRIMARY KEY (equipID),
    FOREIGN KEY (equipID) REFERENCES equipment (equipID) ON DELETE CASCADE
);


/*Favorite List Table*/
CREATE TABLE favorite(
    favoriteID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    equipID INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(favoriteID),
    FOREIGN KEY (userID) REFERENCES user_account(userID)ON DELETE CASCADE,
    FOREIGN KEY (equipID) REFERENCES equipment(equipID) ON DELETE CASCADE,
    CONSTRAINT unique_favorite UNIQUE (userID, equipID)
);

/*Feedback Table */
CREATE TABLE feedback(
    feedbackID INT NOT NULL AUTO_INCREMENT,
    feedbackCategory VARCHAR(50) NOT NULL,
    email VARCHAR(45) NOT NULL,
    contactNum VARCHAR(15) NOT NULL,
    feedbackContent TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (feedbackID)
);

/*Recommendation Table */
CREATE TABLE recommendation(
    recommendationID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (recommendationID),
    FOREIGN KEY (userID) REFERENCES user_account(userID) ON DELETE CASCADE
);

/*Recommended Equipment Table */
CREATE TABLE recommendation_equipment(
    recommendationEquipID INT NOT NULL AUTO_INCREMENT,
    recommendationID INT NOT NULL,
    equipID INT NOT NULL,
    PRIMARY KEY (recommendationEquipID),
    FOREIGN KEY (recommendationID) REFERENCES recommendation(recommendationID) ON DELETE CASCADE,
    FOREIGN KEY (equipID) REFERENCES equipment(equipID) ON DELETE CASCADE
);
