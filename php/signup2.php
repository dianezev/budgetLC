<?php
    include_once "php/common/base.php";
 
    if(!empty($_POST['username'])):
        include_once "php/inc/class.users.inc.php";
        $users = new TotalFinanceUsers($db);
        echo $users->createAccount();
    include_once 'php/common/close.php';
?>
