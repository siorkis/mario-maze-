<?php
    include_once 'config.php';
    include "head.php";
    session_start();

    $sol = $_POST['resolved'];
    $name = $_POST['name'];

    
    $task="INSERT INTO resolved(userid, stage_name, solution) VALUES('".$_SESSION['userid']."', '".$name."', '".$sol."');";
    $result = mysqli_query($link, $task);

    header("Location: maze_v1.php");
?>