<?php
header('Access-Control-Allow-Origin: *'); 
header("Content-Type: text/html; charset=utf-8");

include_once("dbconnect.php");
error_reporting(E_ERROR | E_PARSE);
$data = json_decode(file_get_contents("php://input"));

$date = mysqli_real_escape_string($db, $data->date);
$exercise = mysqli_real_escape_string($db, $data->exercise);
$count = mysqli_real_escape_string($db, $data->count);
$playerId = mysqli_real_escape_string($db, $data->playerId);

$query = "INSERT INTO repetitions (date, exerciseId, count, playerId) VALUES (".$date.",".$exercise.",".$count.",".$playerId.")";
executeQuery($query);

?>