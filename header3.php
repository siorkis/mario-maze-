<style>

nav{
    margin-top: -45px;
}
.levelBlock_1{
    margin: 10px;
}

</style>
<header>
	<div>
	<div class='levels_1'>
<?php

include 'config.php';

$task = "SELECT stage_id, stage_name, stage_info, userid FROM stages WHERE userid='0' ORDER BY stage_name; ";

$result = mysqli_query($link, $task);

if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_array($result)){
        echo "<div class='levelBlock_1'><button onclick= convert('".$row['stage_info']."')> ".$row['stage_name']."</button></div>";
        }
    }

?>
</div>
<nav>
    <a href="register.php" class=righta>Sign Up</a>
    <a href="login.php" class=righta>Log In</a>
    <a href="maze_v1.php" class=righta>Main page</a>

</nav> 
</div>
</header>