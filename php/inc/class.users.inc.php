<?php

/**
 * Handles user interactions within the app
 * 
 * PHP version 5
 */
class Users
{
	/**
	 * The database object
	 * 
	 * @var object
	 */
	private $_db;

	/**
	 * Checks for a database object and creates one if none is found
	 * 
	 * @param object $db
	 * @return void
	 */
	public function __construct($db=NULL)
	{
		if(is_object($db))
		{
			$this->_db = $db;
		}
		else
		{
			$dsn = "mysql:host=".DB_HOST.";dbname=".DB_NAME;
			$this->_db = new PDO($dsn, DB_USER, DB_PASS);
		}
	}


	/**
	 * Checks credentials and logs in the user
	 * 
	 * @return object that includes:
     *    name
     *    TBD: maybe also include user expense 
     *    & budget data in the object?
	 */
	public function accountLogin()
	{
        $result = new stdClass();
        $email = $_POST['email'];
        $password = $_POST['password'];
      
        // TBD: Use MD5(:password) to get hashed pw
        // TBD: when email verification is set up to take
        // user pw, implement hashing for db storage
		$sql = "SELECT *
	    		FROM users
	    		WHERE email=:email
	    		AND hashedPW=:password
	    		LIMIT 1";
        try
          
	    {
	    	$stmt = $this->_db->prepare($sql);
	    	$stmt->bindParam(':email', $email, PDO::PARAM_STR);
	    	$stmt->bindParam(':password', $password, PDO::PARAM_STR);
	    	$stmt->execute();
          
          // example to get name arg from matched rec
          //echo $stmt->fetchObject()->name;
          
        
          
	    	if($stmt->rowCount()==1)
	    	{
                // this is from the original - not sure what it does
	    		//$_SESSION['email'] = htmlentities($_POST['email'], ENT_QUOTES);
	    		//$_SESSION['LoggedIn'] = 1;
	    		return $stmt->fetchObject();
	    	}
	    	else
	    	{
                $result->err_msg = "Error: The email address "
                                  . "or password is incorrect."
                                  . " Please try again or create "
                                  . "a new account.";
	    		return $result;
	    	}
	    }
	    catch(PDOException $e)
	    {
            $result->err_msg = "Error: Unable to log in. "
                              . "Please try again later.";
            return $result;
	    }
	}
  
	/**
	 * Creates account & sends email for user verification
	 * 
	 * Discuss: Prefer to return JSON objects or 
     * maybe JSON & strings instead of any HTML
     * so that we can stick with SPA...
     * Question: why does accountLogin use try catch 
     * & original createAccount doesn't?
	 */

    public function createAccount()
	{
		$email = trim($_POST['email']);
        $name = trim($_POST['name']);
        $result = new stdClass();
      
        // Use hashed timestamp when sending ver. email
		$v = sha1(time());
		
		$sql = "SELECT COUNT(email) AS theCount
				FROM users
				WHERE email=:email";

		if($stmt = $this->_db->prepare($sql)) {
			$stmt->bindParam(":email", $email, PDO::PARAM_STR);
			$stmt->execute();
			$row = $stmt->fetch();
			if($row['theCount']!=0) {
                $result->err_msg = "Error: "
					. "Sorry, that email is already in use. "
					. "Please try again.";
                return $result;
			}
            // TBD: send verification email
			//if(!$this->sendVerificationEmail($email, $v)) {
			//	$result->err_msg = "Error: "
			//		. "There was an error sending your"
			//		. " verification email. Please "
			//		. "contact "
			//		. "us for support. We apologize for the "
			//		. "inconvenience.";
            //   return $result;
			//}
			$stmt->closeCursor();
		}
		
		$sql = "INSERT INTO users(email, ver_code, name)
				VALUES(:email, :ver, :name)";
		if($stmt = $this->_db->prepare($sql)) {
			$stmt->bindParam(":email", $email, PDO::PARAM_STR);
			$stmt->bindParam(":ver", $v, PDO::PARAM_STR);
            $stmt->bindParam(":name", $name, PDO::PARAM_STR);
			$stmt->execute();
			$stmt->closeCursor();

            $result->success_msg = "Welcome to Total Finance, $name!  "
                . "Please check your email to verify your new account. "
                . "An email was sent to $email.";
                return $result;
          
		} else {
            $result->err_msg = "Error: "
                . "Couldn't insert the "
                . "user information into the database.";
            return $result;
		}      
	}

//    public function experimentUpdate()
//	{
//		$sql = "UPDATE `users` SET `hashedPW`='aaa' WHERE `email`='jasonzz1@comcast.net'";
//
//        try
//	    {
//	    	$stmt = $this->_db->prepare($sql);
//	    	$stmt->execute();
//          echo $stmt->rowCount();
//	    	if($stmt->rowCount()==1)
//	    	{
////	    		$_SESSION['name'] = htmlentities($_POST['name'], ENT_QUOTES);
////	    		$_SESSION['LoggedIn'] = 1;
//	    		return TRUE;
//	    	}
//	    	else
//	    	{
//	    		return FALSE;
//	    	}
//	    }
//	    catch(PDOException $e)
//	    {
//	    	return FALSE;
//	    }
//	}
  
}
?>

