<html>
<?php
    include_once "config.php";
    include "head.php";
    include 'header2.php';
    session_start();
    
    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
        header("location: maze_v1.php");
        exit;
    }

    $username=$password="";
    $username_err=$password_err="";

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        
        //username
        if(empty(trim($_POST['username']))){
            $username_err = "Proszę podać nazwę użytkownika";
        } else {
            $username = trim($_POST['username']);
        }

        //password
        if(empty(trim($_POST['password']))){
            $password_err = "Proszę podać hasło";
        } else {
            $password = trim($_POST["password"]);
        }  

        //check
        if(empty($username_err) && empty($password_err)){
            $query="SELECT id, username, password FROM users WHERE username = '".$username."' AND password = '".$password."'; ";

            $result = mysqli_query($link, $query); 

            if(mysqli_num_rows($result)>0){
                $_SESSION["loggedin"] = true;
                $row = mysqli_fetch_array($result);
                $_SESSION["userid"] = $row['id'];
                $_SESSION['username'] = $row['username'];
                header("location:maze_v1.php");
            } else {
                $password_err="Wrong username or/and password!";
                }
            }
            mysqli_close($link);  
    }

?>
<link rel="stylesheet" href="style.css">
<body>
    <div class="login">
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
        <input  type="text" name="username" placeholder="Login" class="loginput" id="username1"><br>
        <span class="help-block"><?php echo $username_err; ?></span><br>
        <input type="password" name="password" placeholder="Password" class="loginput"><br>
        <span class="help-block"><?php echo $password_err; ?></span><br> 
        <input type="submit" value="Log In" id="butlog" class="loginput"><br>
    </form>
    <p class="linkspan">Don't have an account? <a href="register.php" id="registlink">Sign Up!</a></span><br>
    </div>
</body>
</html>
