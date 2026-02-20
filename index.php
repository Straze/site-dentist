<?php
require 'config.php';
if(isset($_POST["ip"])){
  $ip = $_POST["ip"];

  $query = "INSERT INTO entry_data VALUES('', '$ip', CURRENT_TIMESTAMP)";
  mysqli_query($conn, $query);
}
?>
