<?php
header('Access-Control-Allow-Origin: *'); 
header("Content-Type: text/html; charset=utf-8");

include_once("dbconnect.php");
error_reporting(E_ERROR | E_PARSE);
$data = json_decode(file_get_contents("php://input"));

$playerId = mysqli_real_escape_string($db, $data->playerId);

//$query = "SELECT e.id, e.name FROM exercises ORDER BY rank";
$query = "SELECT e.id, 
  e.name,
  IFNULL(group_concat(concat(r.date,'§§§', r.count,'§§§', r.id) order by r.date SEPARATOR '%%%'),'') repetitions
from exercises e
left join (SELECT * FROM repetitions WHERE playerId = ".$playerId.") r
  on r.exerciseId = e.Id group by e.name order by e.rank";

if ($result = executeQuery($query)) {
	$exercises = array();

	while ($row = mysqli_fetch_row($result)) {
		$exc->id = $row[0];
		$exc->name = $row[1];
		//echo $row[2];		
		$reps = array();
		foreach (explode('%%%', $row[2]) as $value) {
			$repTemp = explode('§§§',$value);
			if (count($repTemp)>1) {
				$rep->date = $repTemp[0];
				$rep->count = $repTemp[1];
				$rep->id = $repTemp[2];
				$reps[] = clone $rep;
			}
		}
		//print_r($reps);
		$exc->repetitions = $reps;
		$exercises[] = clone $exc;
    }
    /* free result set */
    mysqli_free_result($result);
    $jsn = json_encode($exercises);
    print_r($jsn);
}

?>