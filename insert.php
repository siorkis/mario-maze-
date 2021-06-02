<?php 
            include_once 'config.php';
    		include "head.php";
    		session_start();


            $stage = $_POST['stage_info'];
            $name = $_POST['stage_name'];
            if($_POST['share']){
                $share = $_POST['share'];
            } else{
                $share = 0; 
            }
            
            
            $task="SELECT stage_id, stage_name, stage_info, userid, share FROM stages WHERE stage_name='".$name."';";
            $result=mysqli_query($link, $task);
            if(mysqli_num_rows($result)>0){
                echo "Already exists! <a href='create_own.php'> Return</a>";
            } else{
                if(!empty($stage)){
                $task="INSERT INTO stages(userid, stage_info, stage_name, share) VALUES('".$_SESSION['userid']."', '".$stage."', '".$name."', '".$share."');";
                $result=mysqli_query($link, $task);
                } 
                header('location:own.php');
            }

            
            
        ?> 