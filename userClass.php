<?php
 
/**
 * Handles user interactions within the app
 *
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
 // Class properties and other methods omitted to save space
 
    /**
     * Checks and inserts a new account email into the database
     *
     * @return string    a message indicating the action status
     */
    public function createAccount()
    {
        $u = trim($_POST['username']);
        $v = sha1(time());
 
        $sql = "SELECT COUNT(Username) AS theCount
                FROM users
                WHERE Username=:email";
        if($stmt = $this->_db->prepare($sql)) {
            $stmt->bindParam(":email", $u, PDO::PARAM_STR);
            $stmt->execute();
            $row = $stmt->fetch();
            if($row['theCount']!=0) {
                return "<h2> Error </h2>"
                    . "<p> Sorry, that email is already in use. "
                    . "Please try again. </p>";
            }
            if(!$this->sendVerificationEmail($u, $v)) {
                return "<h2> Error </h2>"
                    . "<p> There was an error sending your"
                    . " verification email. Please "
                    . "<a href="mailto:help@coloredlists.com">contact "
                    . "us</a> for support. We apologize for the "
                    . "inconvenience. </p>";
            }
            $stmt->closeCursor();
        }
 
        $sql = "INSERT INTO users(Username, ver_code)
                VALUES(:email, :ver)";
        if($stmt = $this->_db->prepare($sql)) {
            $stmt->bindParam(":email", $u, PDO::PARAM_STR);
            $stmt->bindParam(":ver", $v, PDO::PARAM_STR);
            $stmt->execute();
            $stmt->closeCursor();
 
            $userID = $this->_db->lastInsertId();
            $url = dechex($userID);
 
            /*
             * If the UserID was successfully
             * retrieved, create a default list.
             */
            $sql = "INSERT INTO lists (UserID, ListURL)
                    VALUES ($userID, $url)";
            if(!$this->_db->query($sql)) {
                return "<h2> Error </h2>"
                    . "<p> Your account was created, but "
                    . "creating your first list failed. </p>";
            } else {
                return "<h2> Success! </h2>"
                    . "<p> Your account was successfully "
                    . "created with the username <strong>$u</strong>."
                    . " Check your email!";
            }
        } else {
            return "<h2> Error </h2><p> Couldn't insert the "
                . "user information into the database. </p>";
        }
    }
 // Class properties and other methods omitted to save space
 
    /**
     * Sends an email to a user with a link to verify their new account
     *
     * @param string $email    The user's email address
     * @param string $ver    The random verification code for the user
     * @return boolean        TRUE on successful send and FALSE on failure
     */
    private function sendVerificationEmail($email, $ver)
    {
        $e = sha1($email); // For verification purposes
        $to = trim($email);
 
        $subject = "[Colored Lists] Please Verify Your Account";
 
        $headers = <<<MESSAGE
From: Total Finance <donotreply@totalfinance.com>
Content-Type: text/plain;
MESSAGE;
 
        $msg = <<<EMAIL
You have a new account at Total Finance!
 
To get started, please activate your account and choose a
password by following the link below.
 
Your Username: $email
 
Activate your account: http://totalfinance.com/accountverify.php?v=$ver&e=$e
 
If you have any questions, please contact help@totalfinance.com.
 
--
Thanks!
;
 
        return mail($to, $subject, $msg, $headers);
    }
}
}
 
 
?>
