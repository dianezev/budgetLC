<?php

  // called by AJAX in model.setPassword
  
  include_once "../include/class.users.php";

  include_once "../common/base.php";
  header("Content-Type: application/json");
 
  $v = $_POST["v"];
  $password = $_POST["password"];

  $userObj = new Users($db);

  $logObj = $userObj->updatePassword();

  echo JSON_encode($logObj);


?>
