CREATE DATABASE IF NOT EXISTS Katsa;
USE Katsa;

CREATE TABLE IF NOT EXISTS Status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Worker (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    class VARCHAR(50),
    isManager TINYINT(1) DEFAULT 0,
    avatar VARCHAR(255),
    isActive TINYINT(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contractorName VARCHAR(100),
    supervisorName VARCHAR(100),
    location VARCHAR(100),
    description TEXT,
    Tool VARCHAR(100),
    StatusId INT DEFAULT 1,
    inactive TINYINT(1) DEFAULT 1,
    FOREIGN KEY (StatusId) REFERENCES Status(id)
);

CREATE TABLE IF NOT EXISTS Risk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    inactive TINYINT(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS ProjectRisk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projectId INT NOT NULL,
    RiskId INT NOT NULL,
    status INT DEFAULT 1,
    inactive TINYINT(1) DEFAULT 1,
    FOREIGN KEY (projectId) REFERENCES Project(id),
    FOREIGN KEY (RiskId) REFERENCES Risk(id),
    FOREIGN KEY (status) REFERENCES Status(id)
);

CREATE TABLE IF NOT EXISTS Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ProjectRiskId INT NOT NULL,
    description TEXT,
    workerId INT NOT NULL,
    inactive TINYINT(1) DEFAULT 1,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ProjectRiskId) REFERENCES ProjectRisk(id),
    FOREIGN KEY (workerId) REFERENCES Worker(id)
);

-- נתוני Status בסיסיים
INSERT INTO Status (status, color) VALUES
    ('חדש', '#3498db'),
    ('בטיפול', '#f39c12'),
    ('סגור', '#95a5a6'),
    ('אושר', '#2ecc71');

-- עובד מנהל לדוגמה — תשנה לפי הצורך
INSERT INTO Worker (id, name, phone, class, isManager, avatar, isActive) VALUES
    (123456789, 'נדב', '050-0000000', 'מנהל', 1, '', 1);
