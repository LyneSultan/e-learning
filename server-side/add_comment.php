<?php

include "connection.php";
include "auth.php";

[$user_id,$user_type] = authenticate();
try{

$comment_value=$_POST["comment_value"]??NULL;
$comment_type=$_POST["comment_type"]??NULL;

if($comment_value!==""&& $comment_type!==""){
  $query=$connection->prepare("insert into comments(comment_value,comment_type,user_id) Values(?,?,?)");
  $query->bind_param("ssi",$comment_value,$comment_type,$user_id);
  $query->execute();

  if ($query->affected_rows > 0) {
    echo json_encode(["message" => "You have successfully added a comment"]);
  } else {
    echo json_encode(["message" => "Error adding comment "]);
  }

}else {
  echo json_encode(["message"=>"missing data"]);
}

} catch (Exception $e) {
  echo json_encode(["message" => "Invalid token", "error" => $e->getMessage()]);
  exit;
}
