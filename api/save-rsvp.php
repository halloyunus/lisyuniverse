<?php
include '../config/db.php';

if ($conn->connect_error) {
  http_response_code(500);
  exit("DB Error");
}

$name = trim($_POST['name'] ?? '');
$attendance = $_POST['attendance'] ?? '';
$guests = intval($_POST['guests'] ?? 1);

if ($name === '' || $attendance === '') {
  exit("Invalid input");
}

$stmt = $conn->prepare(
  "INSERT INTO rsvp (name, attendance, guests) VALUES (?, ?, ?)"
);
$stmt->bind_param("ssi", $name, $attendance, $guests);

if ($stmt->execute()) {
  echo "success";
} else {
  echo "error";
}
