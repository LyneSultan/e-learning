<?php
include 'connection.php';
$students=[];
$instructors=[];
$courses=[];

try{
    $query_students = $connection->prepare("SELECT * FROM users WHERE user_type = 'student'");
    $query_students->execute();

    $result_students=$query_students->get_result();
    if($result_students->num_rows>0){
      while ($row = $result_students->fetch_assoc()) {
        $students[] = $row;
      }
    }

    $query_instructors = $connection->prepare("SELECT * FROM users WHERE user_type = 'instructor'");
    $query_instructors->execute();

    $result_instructors=$query_instructors->get_result();
    if($result_instructors->num_rows>0){
      while ($row = $result_instructors->fetch_assoc()) {
        $instructors[] = $row;
      }
    }


    $query_courses = $connection->prepare("SELECT * FROM courses");
    $query_courses->execute();

    $result_courses=$query_courses->get_result();
    if($result_courses->num_rows>0){
      while ($row = $result_courses->fetch_assoc()) {
        $courses[] = $row;
      }
    }

    echo json_encode([
      "students"=>$students,
      "instructors"=>$instructors,
      "courses"=>$courses
    ]);
}catch(Exception $e) {return e;}

