<?php
include "connection.php";

$username = $_POST['username'] ?? NULL;
$user_type = 'instructor';

if ($username) {
    $query = $connection->prepare("INSERT INTO users (username, user_type) VALUES (?, ?)");
    $query->bind_param("ss", $username, $user_type);
    $query->execute();

    if ($query->affected_rows>0) {
        echo json_encode(["message" => "Instructor created successfully"]);
    } else {
        echo json_encode(["message" => "Error creating instructor"]);
    }

    $query->close();
} else {
    echo json_encode(["message" => "Username is required"]);
}

$connection->close();
?>
