<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "undangandigital";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  error_log("DB Error: " . $conn->connect_error);
  exit;
}
