<?php
include "connection.php";
require_once './../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretkey="MyTopSecretKey";
$header=getallheaders();
$jwt=$header["Authorization"];

$jwt = str_replace('Bearer ', '', $header["Authorization"]); // Ensure proper token extraction

$key=new Key($secretkey,"HS256");
$decode=JWT::decode($jwt,$key);

$user_id=$decode->user_id;

$query=$connection->prepare("SELECT enrollments.user_id, enrollments.course_id, courses.title
FROM enrollments
JOIN courses ON enrollments.course_id = courses.course_id
WHERE enrollments.user_id = ?;
");
$query->bind_param("i",$user_id);
$query->execute();
$result=$query->get_result();
if($result->num_rows > 0){
  $courses=[];
  while($row=$result->fetch_assoc()){
    $courses[]=$row;
  }
  echo json_encode(["courses"=>$courses]);
}else{
  echo json_encode(["message"=>"error to get courses for the student"]);
}
