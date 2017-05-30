<?php
    include_once "common/base.php";
    $pageTitle = "Register";
 
    if(!empty($_POST['username'])):
        include_once "inc/class.users.inc.php";
        $users = new FinanceUsers($db);
        echo $users->createAccount();
    else:
?>
 
        <h2>Sign up</h2>
        <form method="post" action="signup.php" id="registerform">
            <div>
                <label for="username">Email:</label>
                <input type="text" name="username" id="username" /><br />
                <input type="submit" name="register" id="register" value="Sign up" />
            </div>
        </form>
 
<?php
    endif;
    include_once 'common/close.php';
?>
