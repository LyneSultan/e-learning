<?php
include "connection.php";

$instructor_id=$_POST["instructor_id"]??NULL;
$course_id=$_POST["course_id"]??NULL;

if($instructor_id && $course_id){

$query=$connection->prepare("Update courses set instructor_id=? where course_id=?");
$query->bind_param("ii",$instructor_id,$course_id);
$query->execute();
if($query->affected_rows>0)
{
  echo json_encode(["message" => "Course updated successfully"]);
}
else{
  echo json_encode(["message" => "No course was assigned"]);
}

}
else{
  echo json_encode(["message" => "Required information is missing",]);

}
