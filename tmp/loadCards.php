$sql  = 'SELECT TOP 3 * FROM Customers WHERE Country='Mexico' ORDER BY Address;';

$result = mysql_query($sql);
$to_encode = array();

while($row = mysql_fetch_assoc($result)) {
  $to_encode[] = $row;
}
echo json_encode($to_encode);