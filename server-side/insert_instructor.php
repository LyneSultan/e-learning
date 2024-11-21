<?php
include 'connection.php';

$username=$_POST['username']??NULL;

try{
    $query = $connection->prepare("INSERT INTO users (username, user_type) VALUES (?,  'instructor')");
    $query->bind_param("s", $username);


    if ($query->execute()) {
        echo json_encode(["success" => "Instructor created successfully."]);
    } else {
        echo json_encode(["error" => "Failed to create instructor."]);
    }
}catch(Exception $e) {return e;}

