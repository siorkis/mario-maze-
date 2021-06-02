<?php

    include_once 'config.php';
    include "head.php";
    session_start();



    
    $name = $_GET['name'];
    //echo $name;
    $task="DELETE FROM stages WHERE stage_name = '".$name."';";
    $result=mysqli_query($link, $task);
    header("location: ../account.php");
    ?>

    
    

