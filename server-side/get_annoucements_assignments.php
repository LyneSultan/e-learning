<?php
include "connection.php";

$course_id=$_POST['course_id'];
$annoucements=[];
$assignments=[];

$query1=$connection->prepare("SELECT *
FROM annoucements
WHERE  course_id = ?
");
$query1->bind_param("i",$course_id);
$query1->execute();
$result=$query1->get_result();

if($result->num_rows>0)
{
  while($row=$result->fetch_assoc()){
    $annoucements[]=$row;
  }
}
$query_assignments=$connection->prepare("SELECT *
FROM assignments
WHERE course_id = ?
");
$query_assignments->bind_param("i",$course_id);
$query_assignments->execute();
$result_assignments=$query_assignments->get_result();

if($result_assignments->num_rows>0)
{
  while($row=$result_assignments->fetch_assoc()){
    $assignments[]=$row;
  }
}
echo json_encode(["annoucements"=>$annoucements,
"assignments"=>$assignments]);

