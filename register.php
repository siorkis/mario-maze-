<?php
    include_once "config.php";
    include 'header2.php';

    session_start();//zaczynamy sesję

    //jesli jest zalogowany, przekieruj do strony głównej
    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
        header("location: maze_v1.php");
        exit;
    }

    $username = $password = $confirm_password = "";
    $username_err = $password_err = $confirm_password_err =  "";

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //username
        if(empty(trim($_POST['username']))){
            $username_err = "Choose username.";
        } else{
            $sql = "SELECT id FROM users WHERE username = ?";
    
            if($stmt = mysqli_prepare($link, $sql)){
                mysqli_stmt_bind_param($stmt, "s", $param_username);
                $param_username = trim($_POST["username"]);
                if(mysqli_stmt_execute($stmt)){
                    mysqli_stmt_store_result($stmt);
                    if(mysqli_stmt_num_rows($stmt) == 1){
                        $username_err = "That one is already taken.";
                    } else{
                        $username = trim($_POST["username"]);
                    }
                } else{
                    echo "Something went wrong...";
                }
                mysqli_stmt_close($stmt);
            }
        }
        
        //password
        if(empty(trim($_POST["password"]))){
            $password_err = "Create a password.";     
        } else if(strlen(trim($_POST["password"])) < 6){
            $password_err = "Your password has to be at least 6 characters long.";
        } else{
            $password = trim($_POST["password"]);
        }
        
        // confirm password
        if(empty(trim($_POST["confirm_password"]))){
            $confirm_password_err = "Confirm your password.";     
        } else{
            $confirm_password = trim($_POST["confirm_password"]);
            if(empty($password_err) && ($password != $confirm_password)){
                $confirm_password_err = "Passwords do not match.";
            }
        }
        // Sprawdzamy dane i wysyłamy do bazy
        if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){
            
            $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
             
            if($stmt = mysqli_prepare($link, $sql)){
                mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);
            
                $param_username = $username;
                $param_password = $password;

                if(mysqli_stmt_execute($stmt)){
                    header("location: login.php");
                } else{
                    echo "Something went wrong. Please try again later.";
                }
                mysqli_stmt_close($stmt);
            }
        }
        
        mysqli_close($link);
    }

?>
<html>
    <?php
        
        include "head.php";
    ?>
    <style>
            h2{
                text-align: center;
                margin-bottom: 15px;
            }
        </style>    
    <link rel="stylesheet" href="style.css">
    <body>
        <div class="formReg">
            <h2>Sign Up</h2>    
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">              
                <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                    <label for="username"><span class="form-above-label" >Username</span></label>
                    <input type="text" id="username" name="username" value="<?php echo $username; ?>" class="txtInput">
                    <span class="help-block"><?php echo $username_err; ?></span>
                </div>
                
                <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                    <label for="passwd" ><span class="form-above-label">Password</span></label>
                    <input type="password" id="passwd" name="password" class="txtInput" value="<?php echo $password; ?>">
                    <span class="help-block"><?php echo $password_err; ?></span>
                </div>

                <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                    <label for="reppass"><span class="form-above-label">Confirm password</span></label>
                    <input type="password" id="reppass" name="confirm_password" class="txtInput" value="<?php echo $confirm_password; ?>">
                    <span class="help-block"><?php echo $confirm_password_err; ?></span>
                </div>
                <div class="form-group">
                    <input type="submit" value="Submit" class="buttons" id="randid">
                    <input type="reset" value="Reset" class="buttons">
                </div>
                <p class="linkspan">Already have an account? <a href="login.php" id="registlink">Log In</a>.</p>
            </form>
        </div>