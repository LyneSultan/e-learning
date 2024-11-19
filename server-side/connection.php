<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$connection= new mysqli("localhost","root","","e-learning");

if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}
