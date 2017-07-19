

<?php
  // called by AJAX in model.signup
  
  include_once "../include/class.users.php";

  include_once "../common/base.php";
  header("Content-Type: application/json");

  $email = $_POST["email"];
//  $name = $_POST["name"];

  $userObj = new Users($db);

  $logObj = $userObj->resetAccount($email);

  echo JSON_encode($logObj);

?>
