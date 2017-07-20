<?php
	// Set the error reporting level
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

	// Start a PHP session
	session_start();

	// Include site constants
	include_once "../include/constants.php";

	if ( !isset($_SESSION['token']) || time()-$_SESSION['token_time']>=300 )
	{
		$_SESSION['token'] = md5(uniqid(rand(), TRUE));
		$_SESSION['token_time'] = time();
	}
	
	// Create a database object
	$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

	if ($url['path'] != '') {
	    $server = $url["host"];
	    $username = $url["user"];
	    $password = $url["pass"];
	    $db_name = substr($url["path"], 1);
	} else {
	    $server = DB_HOST;
	    $username = DB_USER;
	    $password = DB_PASS;
	    $db_name = DB_NAME;
	}

	$dsn = "mysql:host=".$server.";dbname=".$db_name;
	$db = new PDO($dsn, $username, $password);


	try {
		$dsn = "mysql:host=".$server.";dbname=".$db_name;
		$db = new PDO($dsn, $username, $password);
	} catch (PDOException $e) {
		echo 'Connection failed: ' . $e->getMessage();
		exit;
	}
?>
