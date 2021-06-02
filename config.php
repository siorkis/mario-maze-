<?php
$username="root";
$password="root";
$server="localhost";
$db="maze";

$link = mysqli_connect($server, $username, $password, $db);

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

?>