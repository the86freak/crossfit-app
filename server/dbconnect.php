<?php
/*
$username = "the86freak";
$password = "REDACTED";
$hostname = "localhost"; 
$dbname = "the86freak";
*/

$username = "root";
$password = "";
$hostname = "localhost"; 
$dbname = "cfa";

$db = mysqli_connect($hostname, $username, $password, $dbname);
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}else{
	//echo "is gut";
}

$sql="CREATE TABLE IF NOT EXISTS exercises (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) UNIQUE KEY, rank INT) ENGINE=INNODB DEFAULT CHARSET=UTF8 COLLATE utf8_general_ci";

// Execute query
if (executeQuery($sql))
  {
  //echo "Table persons created successfully";
  }
else
  {
  //echo "Error creating table: " . mysqli_error($db);
  }

$sql="CREATE TABLE IF NOT EXISTS repetitions (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, date BIGINT, exerciseId INT, count INT, playerId INT) ENGINE=INNODB DEFAULT CHARSET=UTF8 COLLATE utf8_general_ci";

// Execute query
if (executeQuery($sql))
  {
  //echo "Table persons created successfully";
  }
else
  {
  //echo "Error creating table: " . mysqli_error($db);
  }

$sql="CREATE TABLE IF NOT EXISTS players (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) UNIQUE KEY, pwhash varchar(255)) ENGINE=INNODB DEFAULT CHARSET=UTF8 COLLATE utf8_general_ci";

// Execute query
if (executeQuery($sql))
  {
  //echo "Table persons created successfully";
  }
else
  {
  //echo "Error creating table: " . mysqli_error($db);
  }

$players = array('Doldy', 'Manni', 'Mario', 'Malte');
foreach ($players as $player) {
  $sql = sprintf('INSERT INTO players (name) VALUES ("%s")', $player);
  executeQuery($sql);
}

$all = array('Klimmzüge', 'hängende Füße zum Kopf ziehen', 'Langhantel hochziehen', 'Kreuz anheben (Bauchmuskel)',
            'kleine Hantel (Ellenbogen hoch)', 'Seilspringen', 'Ausfallschritt', 'Liegestützen hochspringen', 'Hampelmann',
            'Dips', 'Hochspringen', 'Situps', 'auf Bauch liegen Beine nach hinten hoch');

$i = 0;

foreach ($all as $a) {
	$sql = sprintf('INSERT INTO exercises (name, rank) VALUES ("%s", %s)', $a, $i);
// Execute query
// mysqli_query($db, "SET NAMES 'utf8'"); 
// mysqli_query($db, "SET CHARACTER SET 'utf8'");
if (executeQuery($sql))
  {
  //echo "Insert was successful";
  }
else
  {
  //echo "Error creating entry: " . mysqli_error($db);
  }
$i = $i + 1;
}

function executeQuery($query){
  global $db;
  mysqli_set_charset($db, 'utf8');
  mysqli_query($db, "SET NAMES 'utf8'"); 
  mysqli_query($db, "SET CHARACTER SET 'utf8'");
  return mysqli_query($db, $query);
}



?>