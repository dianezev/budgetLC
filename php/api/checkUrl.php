<?php
  // called by AJAX in model.checkUrl
  
  include_once "../include/class.users.php";

  include_once "../common/base.php";
  header("Content-Type: application/json");

  $e = $_POST["e"];
  $v = $_POST["v"];

  $userObj = new Users($db);

  $logObj = $userObj->verifyAccount();

  echo JSON_encode($logObj);

?>
