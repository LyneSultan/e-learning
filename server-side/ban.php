<?php
include "connection.php";

$user_id = $_POST['user_id'] ?? NULL;
$ban = $_POST['ban'] ?? NULL;

if ($user_id && $ban !== NULL) {

  $query = $connection->prepare("UPDATE users SET ban = ? WHERE user_id = ?");
  $query->bind_param("ii", $ban, $user_id);

  $query->execute();

  if ($query->affected_rows > 0) {
    echo json_encode([
      "user_id"=>$user_id,
      "message" => "updated"]);
  } else {
    echo json_encode([
       "user_id"=>$user_id,
       "message" => "no updates"]);
  }
} else {
  echo json_encode(["message" => "Post problems"]);
}
?>
