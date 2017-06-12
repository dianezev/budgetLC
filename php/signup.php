<?php
    include_once "php/common/base.php";
    $pageTitle = "Register";
 
    if(!empty($_POST['username'])):
        include_once "php/inc/class.users.inc.php";
        $users = new TotalFinanceUsers($db);
        echo $users->createAccount();
    endif;
    include_once 'php/common/close.php';
?>
