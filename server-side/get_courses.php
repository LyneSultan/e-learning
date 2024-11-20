<?php
include 'connection.php';

$query_courses = $connection->prepare("SELECT * FROM courses");
$query_courses->execute();

$result_courses=$query_courses->get_result();
if($result_courses->num_rows>0){
  $courses=[];
  while ($row = $result_courses->fetch_assoc()) {
    $courses[] = $row;
  }
  echo json_encode(["courses"=>$courses]);
}else{
  echo json_encode(["message"=>"did not get courses"]);
}

