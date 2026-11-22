<?php
header('Access-Control-Allow-Origin: *'); 
header("Content-Type: text/html; charset=utf-8");

include_once("dbconnect.php");
error_reporting(E_ERROR | E_PARSE);
$data = json_decode(file_get_contents("php://input"));

$query = "SELECT id, name from players ORDER BY id";

if ($result = executeQuery($query)) {
	$players = array();

	while ($row = mysqli_fetch_row($result)) {
		$player = array();
		$player['id'] = $row[0];
		$player['name'] = $row[1];
		$players[] = $player;
    }
    /* free result set */
    mysqli_free_result($result);
    $jsn = json_encode($players);
    print_r($jsn);
}
?>