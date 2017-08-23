<?php
include_once '../common/base.php';
require_once 'API.class.php';
include_once '../JWT.php';

class MyAPI extends API
{
    public function __construct($request, $origin, $db) {
        parent::__construct($request);
        $this->db = $db;

        $headers = getallheaders();
        if (!array_key_exists('Authorization', $headers)) {
            throw new Exception('Unauthorized (no token)');
        } else {
            $jwt = substr($headers['Authorization'], 7); // skip initial 'bearer '
            $payload = JWT::decode($jwt, getenv('JWT_SECRET'));

            // if (time > $payload->exp) {
            //     throw new Exception('Unauthorized (expired token)');
            // }
            $this->userId = $payload->userId;
        }
    }

    /**
     * Endpoint: actual
     */
     protected function actual($args) {
         $userId = $args[0];
         if ($userId != $this->userId) {
             throw new Exception('Unauthorized User');
         }

        if ($this->method == 'GET') {
            $rows = [];
            
            $sql = "SELECT id, subCode, date, amt, detail
    				FROM actual
    				WHERE userId=:userId";
    		if($stmt = $this->db->prepare($sql)) {
                $stmt->bindParam(":userId", $userId, PDO::PARAM_STR);
    			$stmt->execute();
                // $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $row['amt'] += 0;
                    $rows[] = $row;
                }
                $stmt->closeCursor();
            }
            return $rows;
        } else if ($this->method == 'POST') {
            $sql = "INSERT INTO actual (userId, subCode, date, amt, detail)
    				VALUES (:userId, :subCode, :date, :amt, :detail)";
    		if($stmt = $this->db->prepare($sql)) {
                $stmt->bindParam(":userId", $userId, PDO::PARAM_STR);
                $stmt->bindValue(":subCode", $_POST['subCode'], PDO::PARAM_STR);
                $stmt->bindValue(":date", $_POST['date'], PDO::PARAM_STR);
                $stmt->bindValue(":amt", $_POST['amt'], PDO::PARAM_STR);
                $stmt->bindValue(":detail", $_POST['detail'], PDO::PARAM_STR);
    			return $stmt->execute();
            }
        } else {
            return "Only accepts GET & POST requests";
        }
     }

     /**
      * Endpoint: budget
      */
      protected function budget($args) {
          $userId = $args[0];
          if ($userId != $this->userId) {
              throw new Exception('Unauthorized User');
          }
         if ($this->method == 'GET') {
             $userId = $args[0];
             $rows = [];

             $sql = "SELECT id, subCode, date, amt, detail
     				FROM budget
     				WHERE userId=:userId";
     		if($stmt = $this->db->prepare($sql)) {
                 $stmt->bindParam(":userId", $userId, PDO::PARAM_STR);
                //  $stmt->bindValue(":begin", $year . '-01-01', PDO::PARAM_STR);
                //  $stmt->bindValue(":end", $year+1 . '-01-01', PDO::PARAM_STR);
     			$stmt->execute();
                 // $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
     			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                     $row['amt'] += 0;
                     $rows[] = $row;
                 }
                 $stmt->closeCursor();
             }
             return $rows;
         } else if ($this->method == 'POST') {
             $userId = $args[0];
             $sql = "INSERT INTO budget (userId, subCode, date, amt, detail)
     				VALUES (:userId, :subCode, :date, :amt, :detail)";
     		if($stmt = $this->db->prepare($sql)) {
                 $stmt->bindParam(":userId", $userId, PDO::PARAM_STR);
                 $stmt->bindValue(":subCode", $_POST['subCode'], PDO::PARAM_STR);
                 $stmt->bindValue(":date", $_POST['date'], PDO::PARAM_STR);
                 $stmt->bindValue(":amt", $_POST['amt'], PDO::PARAM_STR);
                 $stmt->bindValue(":detail", $_POST['detail'], PDO::PARAM_STR);
     			return $stmt->execute();
             }
         } else {
             return "Only accepts GET & POST requests";
         }
      }
 }
 // Requests from the same server don't have a HTTP_ORIGIN header
 if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
     $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
 }

 try {
     $API = new MyAPI($_REQUEST['request'], $_SERVER['HTTP_ORIGIN'], $db);
     echo $API->processAPI();
 } catch (Exception $e) {
     echo json_encode(Array('error' => $e->getMessage()));
 }
?>
