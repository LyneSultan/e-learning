<?php

include "connection.php";
include "auth.php";

[$user_id,$user_type] = authenticate();

try {

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
