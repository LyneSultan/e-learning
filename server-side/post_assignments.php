<?php
// include "connection.php";
// require_once './../vendor/autoload.php';
// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

// $secretkey = "MyTopSecretKey";
// $header = getallheaders();
// $jwt=$header["Authorization"];
// $jwt = str_replace('Bearer ', '', $header["Authorization"]); // Ensure proper token extraction

// $course_id=$_POST["course_id"];
// $title=$_POST["title"];

// try {
//   $key = new Key($secretkey, 'HS256');
//   $decode = JWT::decode($jwt, $key);

//   $user_id = $decode->user_id;
//   $user_type = $decode->user_type;
//   if($user_type==="instructor"){
//       $query = $connection->prepare("INSERT INTO assignments (title, user_id,course_id) VALUES (?, ?,?)");
//       $query->bind_param("sii",$title, $user_id, $course_id);
//       $query->execute();

//       if ($query->affected_rows > 0) {
//           echo json_encode(["message" => "You have successfully create an assignment in the course!"]);
//       } else {
//           echo json_encode(["message" => "Error creating that assignment in the course. Please try again."]);
//       }

//   }else {
//       echo json_encode(["message" => "you are not an instructor."]);
//   }


// } catch (Exception $e) {
//   echo json_encode(["message" => "Invalid token", "error"]);
// }

include "connection.php";
include "auth.php";

[$user_id,$user_type] = authenticate();


$course_id = $_POST["course_id"]??NULL;
$title = $_POST["title"]??NULL;
try{

$query = $connection->prepare("INSERT INTO assignments (title, user_id, course_id) VALUES (?, ?, ?)");
$query->bind_param("sii", $title, $user_id, $course_id);
$query->execute();

if ($query->affected_rows > 0) {
    echo json_encode(["message" => "You have successfully created an assignment in the course!"]);
} else {
    echo json_encode(["message" => "Error creating the assignment. Please try again."]);
}
}
catch(Exception $e)
  {return e;}
