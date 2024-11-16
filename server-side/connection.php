<?php
$connection= new mysqli("localhost","root","","e-learning_db");

if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}
