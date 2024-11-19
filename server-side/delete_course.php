<?php
include "connection.php";

$course_id = $_POST["course_id"] ?? NULL;

if ($course_id) {
  $query = $connection->prepare("DELETE FROM courses WHERE course_id = ?");
  $query->bind_param("i", $course_id);

  if ($query->execute()) {
      echo json_encode(["message" => "Course deleted successfully"]);
  } else {
      echo json_encode(["message" => "Failed to delete course"]);
  }
} else {
  echo json_encode(["message" => "Required data missing"]);
}
