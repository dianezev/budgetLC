<?php
	include_once "php/common/base.php";

	if(isset($_GET['v']) && isset($_GET['e']))
	{
		include_once "php/inc/class.users.inc.php";
		$users = new TotalFinanceUsers($db);
		$ret = $users->verifyAccount();
	}
	elseif(isset($_POST['v']))
	{
		include_once "php/inc/class.users.inc.php";
		$users = new TotalFinanceUsers($db);
		$status = $users->updatePassword() ? "changed" : "failed";
		header("Location: /php/account.php?password=$status");
		exit;
	}
	else
	{
		header("Location: /php/login.php");
		exit;
	}

	$pageTitle = "Reset Your Password";
	include_once "php/common/header.php";

	if(isset($ret[0])):
		echo isset($ret[1]) ? $ret[1] : NULL;

		if($ret[0]<3):
?>
<center>
		<h2>Reset Your Password</h2>

		<form method="post" action="php/accountVerify.php">
			<div>
				<label for="p">Choose a New Password:</label>
				<input type="password" name="p" id="p" /><br />				
				<label for="r">Re-Type Password:</label>
				<input type="password" name="r" id="r" /><br />
				<input type="hidden" name="v" value="<?php echo $_GET['v'] ?>" />
				<input type="submit" name="verify" id="verify" value="Reset Your Password" />
				<input type="hidden" name="token"
					value="<?php echo $_SESSION['token']; ?>" />
			</div>
		</form>
</center>

<?php
		endif;
	else:
		echo '<meta http-equiv="refresh" content="0;/">';
	endif;

	include_once 'php/common/close.php';
?>
