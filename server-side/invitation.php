<?php
include "connection.php";
require_once './../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretkey = "MyTopSecretKey";
$header = getallheaders();
$jwt=$header["Authorization"];
$jwt = str_replace('Bearer ', '', $header["Authorization"]);
try {
    $key = new Key($secretkey, 'HS256');
    $decode = JWT::decode($jwt, $key);

    $user_id = $decode->user_id;
    $course_id = $_POST["course_id"] ?? NULL;
    $student_id = $_POST["student_id"] ?? NULL;
    try{
      $query = $connection->prepare("INSERT INTO invitations (instructor_id, course_id,student_id,status) VALUES (?, ?,?,'invited')");
            $query->bind_param("iii", $user_id, $course_id,$student_id);

            if ($query->execute()) {
                echo json_encode(["message" => "Invitation sent successfully."]);
            } else {
                echo json_encode(["message" => "Failed to send invitation."]);
            }

    }catch (Exception $e) {
      echo json_encode(["message" => "Invalid query"]);
    }


}catch (Exception $e) {
  echo json_encode(["message" => "Invalid token", "error"]);
}
?>
