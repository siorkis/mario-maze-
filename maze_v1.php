<html lang="en">
    <?php
    include_once 'config.php';
    include "head.php";
    session_start();
    
    
    ?>


<body>

   <?php 
   
   if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
       include 'header3.php';
   } else{
        include 'header4.php';
   }?>
    
<!-- The Modal -->
<div id="myModal" class="modal">

<!-- Modal content -->
<div class="modal-content">
  <!-- <span class="close">&times;</span> -->
  <form name="myForm" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" >
    <input type=hidden name="resolved" id="hidden">
    <input type=hidden name="name" id="hidden2">
    <input type=submit class = close value='x'>
</form>
  <p id='winlose'></p>
</div>

</div> 

    <script src="script.js"></script>
        
    <div class="divBut">
        <button id="go" class="btn-class" type="button" onclick="addItem(0)">Move forvard</button>
        <button id="left" class="btn-class" type="button" onclick="addItem(-1)">Turn left</button>
        <button id="right" class="btn-class" type="button" onclick="addItem(1)">Turn right</button>
        <button id="right" class="btn-class" type="button" onclick="addItem(2)">For</button>
        <button id="right" class="btn-class" type="button" onclick="addItem(3)">If</button>
        <button id="reset" class="btn-class" onclick="reset()">Reset</button>
        <?php
              if (isset($_SESSION['userid'])){
                  $task="SELECT userid, stage_name, solution FROM resolved WHERE (userid='".$_SESSION['userid']."' AND stage_name = '".$defstagname[0]."') OR
                                                                       (userid='".$_SESSION['userid']."' AND stage_name = '".$defstagname[1]."') OR
                                                                       (userid='".$_SESSION['userid']."' AND stage_name = '".$defstagname[2]."') OR
                                                                       (userid='".$_SESSION['userid']."' AND stage_name = '".$defstagname[3]."') OR
                                                                       (userid='".$_SESSION['userid']."' AND stage_name = '".$defstagname[4]."') OR
                                                                       (userid='".$_SESSION['userid']."' AND stage_name = '".$defstagname[5]."')";
                  $result = mysqli_query($link, $task);
                  if(mysqli_num_rows($result)>0){
                    
                      while($row = mysqli_fetch_array($result)){
                          echo "<input type=hidden value='".$row['solution']."' id='".$row['stage_name']."'>";

                      }
                  }
                }
        ?>
        
    </div>
        
    <div class="listbut">
        <h2>Your Code:</h2>
        <p id="listbutp"></p>
    </div>  

    <div class="clear"></div>
    <div class="link">
        <a href="own.php" class="btn-class">Create your own!</a>
    </div>


     

<?php
if (!empty($_POST)){
    $sol = $_POST['resolved'];
    $name = $_POST['name'];
    if($sol!=""){
        $task="SELECT stage_name, solution, userid FROM resolved WHERE stage_name = '".$name."' AND userid='".$_SESSION['userid']."';";
        $result = mysqli_query($link, $task);
        if(mysqli_num_rows($result)==0){
            $task="INSERT INTO resolved(userid, stage_name, solution) VALUES('".$_SESSION['userid']."', '".$name."', '".$sol."');";
            $result = mysqli_query($link, $task);
        } else if(mysqli_num_rows($result)==1){
            $row = mysqli_fetch_array($result);
            
            if (strpos($row['solution'], 'for') !== false) {
                $for_check_base = strlen($row['solution']) - 6;
            } else {
              $for_check_base = strlen($row['solution']);
            }
            
            if (strpos($sol, 'for') !== false) {
                $for_check_input = strlen($sol) - 6;
            } else {
              $for_check_input = strlen($sol);
            }


            if (strpos($row['solution'], 'if') !== false) {
                $if_check_base = $for_check_base - 6;
            } else {
              $if_check_base = $for_check_base;
            }
            
            if (strpos($sol, 'if') !== false) {
                $if_check_input = $for_check_input - 6;
            } else {
              $if_check_input = $for_check_input;
            }

            if($if_check_base > $if_check_input){
              $task= "UPDATE resolved SET solution = \"$sol\" WHERE userid='".$_SESSION['userid']."' AND stage_name = '".$name."' ";

              $result = mysqli_query($link, $task); 
            }

            
        }
        
    }
    
}
?>

   <script>convert('42k53k44k59k513k220k325k326k327k328k329k133k441k542k443k544k445k649k653k656k657k661k662k663k');
            disableButtons();      
    </script>

</body>
</html>
