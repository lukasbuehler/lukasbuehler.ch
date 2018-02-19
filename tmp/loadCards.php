<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");

$servername = "lukasbuehler.ch:3306";
$username = "web";
$password = "hello_friend";
$dbname = "Cards";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("{error: 'Connection failed: " . $conn->connect_error+"'}");
}

$sql = 'SELECT * FROM `cards`';
$rows = array();
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row

    while($row = $result->fetch_assoc()) {
        array_push($rows, json_encode($row));
    }

    echo "{" . join(",", $rows) . "}";

} else {
    echo "{error: '0 results'}";
}

?>