<?php include "connection.php";
require_once './../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
function authenticate(){

  $secretkey = "MyTopSecretKey";
  $header = getallheaders();
  $jwt=$header["Authorization"];

  try {
    $key = new Key($secretkey, 'HS256');
    $decode = JWT::decode($jwt, $key);

    $user_id = $decode->user_id;
    $user_type = $decode->user_type;
    return[$user_id,$user_type];


  }
  catch(Exception $e)
  {return e;}

}
