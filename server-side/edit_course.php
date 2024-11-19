<?php
include "connection.php";

$course_id = $_POST["course_id"] ?? NULL;
$title = $_POST["title"] ?? NULL;

if ($course_id != NULL && $title != NULL) {
    $query = $connection->prepare("UPDATE courses SET title = ? WHERE course_id = ?");

    $query->bind_param("si", $title, $course_id);

    if ($query->execute()) {
        echo json_encode(["message" => "Course updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update course"]);
    }
} else {
    echo json_encode(["message" => "Required data missing"]);
}
?>
