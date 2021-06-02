<head>
    <meta charset="UTF-8">
    <title>Maze</title>
    <link rel="icon" href="https://cdn2.iconfinder.com/data/icons/business-icons-3-2/256/Finding_Solutions-512.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatitble" content="ie=edge">
    <link rel="stylesheet" href="../style.css">

</head>
<?php
    include_once 'config.php';
    
    session_start();
    
    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
        header("location: login.php");
        
    }

    $_SESSION['name'] = $_GET['name'];
    

    
    ?>
<body>
    <header>
    <nav>
        <a href="../logout.php" class=righta> Log out</a>
        <a href="../account.php" class=righta>My profile</a>
        <a href="../own.php" class=righta>Create</a>
        <a href="../maze_v1.php" class=righta>Main page</a>
    </nav> 
    </header>
    <!-- The Modal -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
        <!-- <span class="close">&times;</span> -->
        <form name="myForm" method="POST" action="<?php echo "../your_stage.php/?name=".$_SESSION['name']; ?>">
            <input type=hidden name="resolved" id="hidden">
            <input type=hidden name="name" id="hidden2">
            <input type=submit class = close value='x'>
        </form>
        <p id='winlose'></p>
        </div>
    </div> 
    <input value ="<?php echo $_SESSION["name"];?>" id='stage' hidden>
    
    
    <div class="divBut">
        <button id="go" class="btn-class" type="button" onclick="addItem(0)">Move forvard</button>
        <button id="left" class="btn-class" type="button" onclick="addItem(-1)">Turn left</button>
        <button id="right" class="btn-class" type="button" onclick="addItem(1)">Turn right</button>
        <button id="reset" class="btn-class" onclick="reset()">Reset</button>
        <?php
                $task="SELECT userid, stage_name, solution FROM resolved WHERE userid='".$_SESSION['userid']."' AND stage_name = '".$_SESSION['name']."';";
                
                $result = mysqli_query($link, $task);
                if(mysqli_num_rows($result)>0){
                    while($row = mysqli_fetch_array($result)){
                        echo "<input type=hidden value='".$row['solution']."' id='".$row['stage_name']."'>";
                    }
                }

        ?>
    </div>
    <script src="../your_stage.js"></script>
        
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
            $task="SELECT stage_name, solution FROM resolved WHERE stage_name = '".$name."' AND solution = '".$sol."';";
            $result = mysqli_query($link, $task);
            if(mysqli_num_rows($result)==0){
                $task="INSERT INTO resolved(userid, stage_name, solution) VALUES('".$_SESSION['userid']."', '".$name."', '".$sol."');";
                $result = mysqli_query($link, $task);
            }
            
        }
        
    }
?>
</body>
</html>
    