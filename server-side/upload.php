<?php
include "connection.php";
require_once './../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretkey = "MyTopSecretKey";
$header = getallheaders();

$jwt=$_POST['token']??NULL;
try {
    $key = new Key($secretkey, 'HS256');
    $decode = JWT::decode($jwt, $key);
    $user_id = $decode->user_id;

    try{
      $fileName = $_FILES["fileToUpload"]["name"];
      $fileTmpName = $_FILES["fileToUpload"]["tmp_name"];
      $fileSize = $_FILES["fileToUpload"]["size"];

      if ($fileSize > 5000000) {
          die("Sorry, your file is too large.");
      }

      $fileData = addslashes(file_get_contents($fileTmpName));

      $assignment_id=$_POST["assignment_id"]??NULL;

      $query =$connection->prepare( "INSERT INTO submissions (file_name, file_data,student_id,assignment_id) VALUES (?, ?,?,?)");
      $query->bind_param("sbii", $fileName, $fileData, $user_id, $assignment_id);
      $query->execute();

      if ($query->affected_rows > 0) {
          echo "The file  has been uploaded and stored in the database.";
      } else {
          echo "Error saving file to database: " . $connection->error;
      }

    }catch(Exception $e){echo $e;}

    $connection->close();

} catch (Exception $e) {
    echo json_encode(["message" => "Invalid token", "error"]);
}
?>
