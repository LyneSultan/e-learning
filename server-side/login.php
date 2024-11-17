<?php
include "connection.php";

$username=$_POST['username'];
$password=$_POST['password'];

$query=$connection->prepare("select * from users where username=?");
$query->bind_param("s",$username);

$query->execute();
$result = $query->get_result();

if($result->num_rows>0)
{
  $user=$result->fetch_assoc();
  // $check_pass=password_verify($password,$user["password"]);

  if($password==$user["password"])
  {
    echo json_encode([
      "message"=>"Login succefull",
      "user"=>$user,

    ]);
  }else{
    echo json_encode([
      "message"=>"invalid credentials"
    ]);

  }


}else {
  echo json_encode([
    "message"=>"username not found in login"
  ]);
}
