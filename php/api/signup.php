

<?php
  // called by AJAX in model.signup
  
  include_once "../include/class.users.php";

  include_once "../common/base.php";
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: *");
  header("Content-Type: application/json");
  
  $email = $_POST["email"];
  $name = $_POST["name"];

  $userObj = new Users($db);

  $logObj = $userObj->createAccount();

  echo JSON_encode($logObj);

?>
