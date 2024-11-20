<?php
include "connection.php";

 $title = $_POST["title"] ?? NULL;

 if ($title) {
     $query = $connection->prepare("INSERT INTO courses (title) VALUES (?)");
     $query->bind_param("s", $title);

     if ($query->execute()) {
         echo json_encode(["message" => "Course created successfully",
        "course_id"=>$connection->insert_id,
        "title"=>$title]);
     } else {
         echo json_encode(["message" => "Failed to create course"]);
     }
 } else {
     echo json_encode(["message" => "Required data missing"]);
 }
