<?php
include "connection.php";
include "auth.php";

[$user_id,$user_type] = authenticate();

$course_id=$_POST["course_id"]??NULL;
$annoucement_text=$_POST["annoucement_text"]??NULL;

try {

  if($user_type==="instructor"){
      $query = $connection->prepare("INSERT INTO annoucements (annoucement_text, user_id,course_id) VALUES (?, ?,?)");
      $query->bind_param("sii",$annoucement_text, $user_id, $course_id);
      $query->execute();

      if ($query->affected_rows > 0) {
          echo json_encode(["message" => "You have successfully create an annoucement in the course!"]);
      } else {
          echo json_encode(["message" => "Error creating that annoycement in the course. Please try again."]);
      }

  }else {
      echo json_encode(["message" => "you are not an instructor."]);
  }


} catch (Exception $e) {
  echo json_encode(["message" => "Invalid token", "error"]);
}
