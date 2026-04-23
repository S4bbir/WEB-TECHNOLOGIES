<?php
session_start();
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $stmt = $db->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($id, $name, $hashed_password);
    if ($stmt->fetch() && password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        $_SESSION['user'] = $name;
        $_SESSION['start_time'] = time();

  
        $now = date('Y-m-d H:i:s');
        $update_stmt = $db->prepare("UPDATE users SET last_login = ? WHERE id = ?");
        $update_stmt->bind_param("si", $now, $id);
        $update_stmt->execute();
        $update_stmt->close();


        setcookie('user_email', $email, time() + (30 * 24 * 3600), '/'); // 30 days
        setcookie('last_login', $now, time() + (30 * 24 * 3600), '/');

        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid email or password.";
    }
    $stmt->close();
}
$db->close();
?>