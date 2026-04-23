<?php
$host = "localhost";
$user = "root";
$password = "";
$dbName = "user_data";

// Connect to MySQL
$conn = mysqli_connect($host, $user, $password);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $dbName";
if ($conn->query($sql) !== TRUE) {
    die("Error creating database: " . $conn->error);
}

// Select the database
mysqli_select_db($conn, $dbName);

// Create employees table if not exists
$tableSql = "CREATE TABLE IF NOT EXISTS employees (
    employee_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    gender ENUM('Male','Female','Other') NOT NULL,
    date_of_birth DATE NOT NULL,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    qualification VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    address TEXT,
    salary DECIMAL(10,2) NOT NULL,
    joining_date DATE NOT NULL,
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";


$tableSql = "CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'parent', 'teacher', 'professional') NOT NULL,
    track ENUM('creative-coding', 'ui-ux', 'ai-fundamentals', 'foundations') NOT NULL,
    start_date DATE NOT NULL,
    notes TEXT,
    terms_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";



if ($conn->query($tableSql) !== TRUE) {
    die("Error creating table: " . $conn->error);
}
?>