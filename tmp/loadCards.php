<?php
header('Content-type: application/json');

$servername = "lukasbuehler.ch:3306";
$username = "web";
$password = "hello_friend";
$dbname = "Cards";

echo "Hi JS";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT * FROM `cards`';
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $to_encode = array();
    while($row = $result->fetch_assoc()) {
        $to_encode[] = $row;
    }

    echo html_entity_decode(json_encode($to_encode));

} else {
    echo "0 results";
}
$conn->close();
?>