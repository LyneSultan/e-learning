<?php
include "connection.php";
require_once './../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretkey = "MyTopSecretKey";
$header = getallheaders();
$jwt=$header["Authorization"];
$jwt = str_replace('Bearer ', '', $header["Authorization"]); // Ensure proper token extraction

$assignment_id=$_POST["assignment_id"];
$file=$_POST["file"];

try {
  $key = new Key($secretkey, 'HS256');
  $decode = JWT::decode($jwt, $key);

  $user_id = $decode->user_id;
  $user_type = $decode->user_type;
  if($user_type==="student"){
      $query = $connection->prepare("INSERT INTO submissions (assignment_id, file,student_id) VALUES (?, ?,?)");
      $query->bind_param("isi",$assignment_id, $file, $user_id);
      $query->execute();

      if ($query->affected_rows > 0) {
          echo json_encode(["message" => "You have successfully submmit an assignment in the course!"]);
      } else {
          echo json_encode(["message" => "Error submitting that assignment in the course. Please try again."]);
      }

  }else {
      echo json_encode(["message" => "you are not an student."]);
  }


} catch (Exception $e) {
  echo json_encode(["message" => "Invalid token", "error"]);
}
