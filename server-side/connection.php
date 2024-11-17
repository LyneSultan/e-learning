<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$connection= new mysqli("localhost","root","","e-learning_db");

if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}
