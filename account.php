<html lang="en">
    <?php
    include_once 'config.php';
    include "head.php";
    session_start();

    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
        header("location: login.php");
        
    }
    
    ?>
<style>
        #mySearch {
            width:200px;
            font-size: 18px;
            padding: 8px;
            border: 1px solid #ddd;
            margin-bottom: 20px;
}

/* Style the navigation menu */
#myMenu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
#delimg{
    /* margin-left: 15px; */
    
    float: right;
    
}
.cardd:before{
  background-image: url('example_3.png');
  background-size: 336px 336px;
  display: inline-block;
  content:"";
  width:336px;
  height:336px;
  margin-bottom: 5px;
}
.cardd{
  text-decoration: none;
  text-align: center;
  color:#212121;
}
.share{
  float: left;
  margin-left: 5px;
}
</style>

<body>
    <?php include 'header1.php'; ?>
    <h2 id="hst">Your stages:</h2>
    
    <center>
    <input type="text" id="mySearch" onkeyup="myFunction()" placeholder="Search.." title="Type in a category"><br>
    <div class="levels" id="myMenu">
    
       <?php  
        
        $task="SELECT stage_id, stage_name, stage_info, userid, share FROM stages WHERE userid='".$_SESSION['userid']."' OR share = '1' ORDER BY stage_id DESC;";
        $result=mysqli_query($link, $task);
    
        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_array($result)){
              if($row['userid'] == $_SESSION['userid']){
                echo "<div class='levelBlock card card-item'><a class ='cardd' href='your_stage.php/?name=".$row['stage_info']."'>".$row['stage_name']."</a><a href='del.php/?name=".$row['stage_name']."'>
                <img id='delimg' src='del.png' height='20px'></a></div>";
                $_GET['name'] = $row['stage_info'];
              } else {
                echo "<div class='levelBlock card card-item'><a class ='cardd' href='your_stage.php/?name=".$row['stage_info']."'><img class='share' width='20px' height='20px'src='share.png'>".$row['stage_name']."</a><a href='del.php/?name=".$row['stage_name']."'>
                <img id='delimg' src='del.png' height='20px'></a></div>";
                $_GET['name'] = $row['stage_info'];
              }
               
            }
        }

    ?> 
    
    </div>
    
    </center>
    

<script>
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("div");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

const cards = document.querySelectorAll('.card');
//const cardsItem = document.querySelectorAll('.card-item');
let cards_new = document.getElementById('myMenu');

// for (let i = 1; i < cards_new.childElementCount; i++){

// }

for (let i = 0; i < cards.length; i++){
  var card = cards[i];
  //var cardItem = cardsItem[i];
  card.addEventListener('mousemove', startRotate);
  card.addEventListener('mouseout', stopRotate);
}


function startRotate(event){
  const cardItem = document.querySelector('.card-item');
  const half = cardItem.offsetHeight / 2;
  console.log('start');
  cardItem.style.transform = 'rotateX('+(event.offsetY - half)/10+'deg) rotateY('+-(event.offsetX - half)/10+'deg)';
}

function stopRotate(event){
  const cardItem = document.querySelector('.card-item');
  console.log('stop');
  cardItem.style.transform = 'rotate(0)';
}
</script>
    
</body>

</html>


<!-- <form method='POST' action='your_stage.php' >
<input hidden name='stage' value='".$row['stage_info']."'>
<img src='example.png' width='336px' height='336px'>
<input type='submit' value='".$row['stage_name']."'>
<a href='del.php/?name=".$row['stage_name']."'>
<img id='delimg' src='del.png' height='20px'></a></form> -->