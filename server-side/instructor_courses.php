<?php
include "connection.php";
require_once './../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "MyTopSecretKey";
$headers = getallheaders();
$jwt = $headers["Authorization"];
try {
  $key = new Key($secretKey, "HS256");
  $decode = JWT::decode($jwt, $key);

  $user_id = $decode->user_id;
  $user_type = $decode->user_type;
  // echo json_encode(["user-id"=>$user_id,
  //        "user_type"=>$user_type]);

  if($user_type==="instructor"){

    $query = $connection->prepare("select * from courses where instructor_id=?");
    $query->bind_param("i", $user_id);
    $query->execute();

    $result=$query->get_result();
    if($result->num_rows>0){
      $instructor_courses=[];
      while ($row = $result->fetch_assoc()) {
        $instructor_courses[] = $row;
      }
      echo json_encode(["instructor_courses"=>$instructor_courses]);
    } else {
        echo json_encode(["message" => "no courses for that instructor"]);
    }


  }else{
    echo json_encode(["message" => "not an instructor"]);

  }

} catch (Exception $e) {
    echo json_encode(["message" => "Invalid token", "error"]);
}
?>
