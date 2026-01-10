<?php
$conn = new mysqli("localhost", "root", "", "undangandigital");

$result = $conn->query("SELECT name, message FROM wishes ORDER BY id DESC ");

$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

header("Content-Type: application/json");
echo json_encode($data);

