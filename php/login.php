<?php
  // called by AJAX in model.login
  
  include_once "../include/class.users.php";

  include_once "../common/base.php";
  
  $email = $_POST["email"];
  $password = $_POST["password"];

  $userObj = new Users($db);

  $logObj = $userObj->accountLogin();

  echo JSON_encode($logObj);

?>
