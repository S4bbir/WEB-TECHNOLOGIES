<?php
session_start();

$timeout = 30; 


if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit();
}

if (time() - $_SESSION['start_time'] > $timeout) {
    session_unset();
    session_destroy();
    header("Location: login.html");
    exit();
}

$user = $_SESSION['user'];
$last_login = isset($_COOKIE['last_login']) ? $_COOKIE['last_login'] : 'N/A';
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
<h2>Welcome, <?php echo htmlspecialchars($user); ?></h2>
<p>Last login: <?php echo htmlspecialchars($last_login); ?></p>
<p>You will be logged out after 30 seconds automatically.</p>
<a href="logout.php">Logout</a>
</body>
</html>