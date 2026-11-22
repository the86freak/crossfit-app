<?php
header('Access-Control-Allow-Origin: *'); 
header("Content-Type: text/html; charset=utf-8");

include_once("dbconnect.php");
error_reporting(E_ERROR | E_PARSE);
$data = json_decode(file_get_contents("php://input"));

$repetitionId = mysqli_real_escape_string($db,$data->repetitionId);
$exercise = mysqli_real_escape_string($db,$data->exercise);
$count = mysqli_real_escape_string($db,$data->count);

$query = "DELETE FROM repetitions WHERE id = " . $repetitionId;
executeQuery($query);
?>