<?php
$host = "localhost";
$user = "lisyuniv_lisyuniverse";
$pass = "lisyuniverse20260326";
$db   = "lisyuniv_undangandigital";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  error_log("DB Error: " . $conn->connect_error);
  exit;
}
