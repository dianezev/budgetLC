<?php
include_once '../common/base.php';
echo 'blah';
print_r($db);
echo $server;
echo $db_name;
echo $username;
echo $password;
echo 'blah';

$sql = <<<QUERY
DROP TABLE users;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}
echo 'blah';

$sql = <<<QUERY
CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `hashedPW` varchar(100) NOT NULL,
  `ver_code` varchar(100) NOT NULL,
  `verified` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}
echo 'blah blah';

$sql = <<<QUERY
INSERT INTO `users` (`userId`, `name`, `email`, `hashedPW`, `ver_code`, `verified`) VALUES
(1, 'Tom', 'tom@comcast.net', md5('tom'), 'd26d2b8ec72b5a68fb6ffe7d6e1cf3b351401103', 1),
(2, 'Michael', 'mp__@hotmail.com', md5('test'), '112dd7a73c8cf54bcd566de0cc3a488fb6c29e88', 1);
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

// Table "actual"

$sql = <<<QUERY
DROP TABLE actual;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
CREATE TABLE `actual` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subCode` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  `detail` varchar(144) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
ALTER TABLE `actual`
  ADD PRIMARY KEY (`id`);
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
ALTER TABLE `actual`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
INSERT INTO `actual` (`userId`, `subCode`, `date`, `amt`, `detail`) VALUES
(1, 'hous_01', '2017/1/1', '1200.00', '' ),
(1, 'hous_01', '2017/2/1', '1200.00', '' ),
(1, 'hous_01', '2017/3/1', '1200.00', '' ),
(1, 'hous_01', '2017/4/1', '1200.00', '' ),
(1, 'hous_01', '2017/5/1', '1200.00', '' ),
(1, 'hous_01', '2017/6/1', '1200.00', '' ),
(1, 'hous_01', '2017/7/1', '1200.00', '' ),
(1, 'hous_01', '2017/8/1', '1200.00', '' ),
(1, 'hous_01', '2017/9/1', '1200.00', '' ),
(1, 'hous_01', '2017/10/1', '1200.00', '' ),
(1, 'hous_02', '2017/2/11', '35.56', 'new faucet' ),
(1, 'hous_02', '2017/1/20', '210.00', 'plumber' ),
(1, 'hous_02', '2017/3/4', '26.89', 'chimney sealant' ),
(1, 'hous_03', '2017/1/1', '425.12', 'tile backsplash' ),
(1, 'hlth_01', '2017/1/1', '500.00', '' ),
(1, 'hlth_01', '2017/1/10', '200.00', '' ),
(1, 'hlth_04', '2017/2/1', '40.00', 'dentist & pt' ),
(1, 'tran_01', '2017/1/10', '473.00', '' ),
(1, 'food_01', '2017/1/10', '25.00', '' ),
(1, 'util_01', '2017/1/10', '200.00', '' ),
(1, 'char_01', '2017/1/10', '600.00', '' ),
(1, 'leis_01', '2017/1/10', '330.00', 'jet ski rental' ),
(1, 'taxx_01', '2017/1/10', '1200.00', '' ),
(1, 'acct_01', '2017/1/10', '1000.00', '' ),
(1, 'misc_01', '2017/1/10', '730.00', 'stuff' ),
(1, 'food_02', '2017/1/10', '250.00', '' );
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

// Table "budget"

$sql = <<<QUERY
DROP TABLE budget;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
CREATE TABLE `budget` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subCode` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  `detail` varchar(144) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
ALTER TABLE `budget`
  ADD PRIMARY KEY (`id`);
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
ALTER TABLE `budget`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

$sql = <<<QUERY
INSERT INTO `budget` (`userId`, `subCode`, `date`, `amt`, `detail`) VALUES
(1, 'hous_01', '2017/1/1', '1200.00', ''),
(1, 'hous_01', '2017/2/1', '1200.00', ''),
(1, 'hous_01', '2017/3/1', '1200.00', ''),
(1, 'hous_01', '2017/4/1', '1200.00', ''),
(1, 'hous_01', '2017/5/1', '1200.00', ''),
(1, 'hous_01', '2017/6/1', '1200.00', ''),
(1, 'hous_01', '2017/7/1', '1200.00', ''),
(1, 'hous_01', '2017/8/1', '1200.00', ''),
(1, 'hous_01', '2017/9/1', '1200.00', ''),
(1, 'hous_01', '2017/10/1', '1200.00', ''),
(1, 'hous_02', '2017/1/1', '75.00', ''),
(1, 'hous_02', '2017/2/1', '75.00', ''),
(1, 'hous_02', '2017/3/1', '75.00', ''),
(1, 'hous_02', '2017/4/1', '75.00', ''),
(1, 'hous_02', '2017/5/1', '75.00', ''),
(1, 'hous_02', '2017/6/1', '75.00', ''),
(1, 'hous_02', '2017/7/1', '75.00', ''),
(1, 'hous_02', '2017/8/1', '75.00', ''),
(1, 'hous_02', '2017/9/1', '75.00', ''),
(1, 'hous_02', '2017/10/1', '75.00', ''),
(1, 'hous_03', '2017/1/1', '100.00', ''),
(1, 'hous_03', '2017/2/1', '100.00', ''),
(1, 'hous_03', '2017/3/1', '100.00', ''),
(1, 'hous_03', '2017/4/1', '100.00', ''),
(1, 'hous_03', '2017/5/1', '100.00', ''),
(1, 'hous_03', '2017/6/1', '100.00', ''),
(1, 'hous_03', '2017/7/1', '100.00', ''),
(1, 'hous_03', '2017/8/1', '100.00', ''),
(1, 'hous_03', '2017/9/1', '100.00', ''),
(1, 'hous_03', '2017/10/1', '100.00', ''),
(1, 'hlth_01', '2017/1/1', '500.00', 'medical'),
(1, 'hlth_01', '2017/1/10', '200.00', 'dental'),
(1, 'hlth_04', '2017/2/12', '20.00', ''),
(1, 'hlth_04', '2017/2/22', '20.00', ''),
(1, 'hlth_04', '2017/3/3', '20.00', ''),
(1, 'hlth_04', '2017/7/12', '20.00', '');
QUERY;

if($stmt = $db->prepare($sql))
{
    $stmt->execute();
}

// $sql = <<<QUERY
//
// QUERY;
//
// if($stmt = $db->prepare($sql))
// {
//     $stmt->execute();
// }
//
echo 'OK';

?>
