
<?php
include 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    echo "Registration successful for $name ($email)";
} else {
    echo "Invalid request method.";
}
$db->close();
?>