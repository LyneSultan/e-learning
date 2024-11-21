<?php
include "connection.php";
include "auth.php";

[$user_id,$user_type] = authenticate();
$course_id = $_POST["course_id"] ?? NULL;

try {
    if($user_type==="student"){
        $query = $connection->prepare("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)");
        $query->bind_param("ii", $user_id, $course_id);
        $query->execute();

        if ($query->affected_rows > 0) {
            echo json_encode(["message" => "You have successfully enrolled in the course!"]);
        } else {
            echo json_encode(["message" => "Error enrolling in the course. Please try again."]);
        }

    }else {
        echo json_encode(["message" => "you are not a student."]);
    }
} catch (Exception $e) {
    echo json_encode(["message" => "Invalid token", "error"]);
}
