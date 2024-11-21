<?php
include "connection.php";
include "auth.php";

[$user_id,$user_type] = authenticate();


try{
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

}catch(Exception $e) {return e;}

