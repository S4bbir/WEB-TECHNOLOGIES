<?php
session_start();

session_unset();
session_destroy();


setcookie('user_email', '', time() - 3600, '/');
setcookie('last_login', '', time() - 3600, '/');

header("Location: login.html");
exit();
?>