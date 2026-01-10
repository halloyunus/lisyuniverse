<?php
include '../config/db.php';
// $conn = new mysqli("localhost", "root", "", "undangandigital");

if ($conn->connect_error) {
  http_response_code(500);
  exit("DB Error");
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if ($name === '' || $message === '') {
  http_response_code(400);
  exit("Invalid input");
}

$stmt = $conn->prepare("INSERT INTO wishes (name, message) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $message);
$stmt->execute();

echo "success";
