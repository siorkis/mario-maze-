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

$defstagname = [];

if(mysqli_num_rows($result)>0){
    $i=0;
    while($row = mysqli_fetch_array($result)){
        echo "<div class='levelBlock_1'><button onclick= \"convert('".$row['stage_info']."'); enableButtons();\"> ".$row['stage_name']."</button></div>";
        $defstagname[$i] = $row['stage_info'];
        $i++;
        }
    }
    
?>
</div>
<nav>
    <a href="logout.php" class=righta> Log out</a>
    <a href="account.php" class=righta>My profile</a>
    <a href="own.php" class=righta>Create</a>
    <a href="maze_v1.php" class=righta>Main page</a>
</nav> 
</header>