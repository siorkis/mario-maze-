<html lang="en">
<?php
    include_once 'config.php';
    include "head.php";
    session_start();
    
    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
        header("location: login.php");
        
    }
    //echo $_SESSION['userid'];
    ?>

<body>
    <?php include 'header1.php'?>
    


        <div class="divBut">
           
            <div id='1'>
                <img class='pig drag_position dragItem' id='pig' src='media/images/bowser.png' draggable='true' data-item="1">
            </div>

            <div id='3'> 
                <img class='bird_right drag_position dragItem' id='bird' src='media/images/mario_right.png' draggable='true' data-item='3'>
            </div>

            <div id='2'>
                <img class='obstacle drag_position dragItem' id='obst3' src='media/images/mario_block_1.png' draggable='true' data-item='2'>
            </div>

            <div id='2.1'>
                <img class='obstacle drag_position dragItem' id='obst1' src='media/images/mario_block_2.png' draggable='true' data-item='2.1'>
            </div>

            <div id='2.2'>
                <img class='obstacle drag_position dragItem' id='obst2' src='media/images/mario_block_3.png' draggable='true' data-item='2.2'>
            </div>

            <div id='2.3'>
                <img class='obstacle drag_position dragItem' id='obst4' src='media/images/mario_block_4.png' draggable='true'data-item='2.4'>
            </div>       
            
        </div>
       

        <div class="delete" id='del' data-zone='delZone'>
            
        </div>
            
        <script src="script_own.js"></script>  
        <div class="save">
           <form action="insert.php" method="POST">
            <input type="text" value="" name="stage_info" id="stage_info" hidden><br>
            <input type="text"  class="nameinput" placeholder="Stage Name" name="stage_name" required>
            <input type="submit" style="border-radius:10px; padding: 5px 10px;" value="Save" name="save" id="save" >
            <br><br>
            <input type="checkbox" id="share" name="share" value='1'>
            <label for="share"> Share your stage.</label>
            </form>
            <script>document.getElementById("save").onclick = function() {save()};</script> 
        </div>
        
        
	     
</body>
</html>

