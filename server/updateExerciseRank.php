<?php
header('Access-Control-Allow-Origin: *'); 
header("Content-Type: text/html; charset=utf-8");

include_once("dbconnect.php");
error_reporting(E_ERROR | E_PARSE);
$exercises = json_decode(file_get_contents("php://input"));

print_r($exercises);

$i = 0;
$query = "UPDATE exercises SET rank = CASE ";
foreach ($exercises as $exercise) {
	$query = $query . " WHEN id =" . $exercise . " THEN " .  $i;
	$i++;
}
$query = $query . " ELSE rank END;";

executeQuery($query);

?>