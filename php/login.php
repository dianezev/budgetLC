<?php
	include_once "php/common/base.php";

	if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])):
?>

		<p>You are currently <strong>logged in.</strong></p>
		<p><a href="/logout.php">Log out</a></p>
	
<?php
	elseif
		(
			!empty($_POST['token'])
			&& $_SESSION['token']==$_POST['token']
			&& !empty($_POST['username'])
			&& !empty($_POST['password'])
		):
		include_once 'php/inc/class.users.inc.php';
		$users = new FinanceUsers($db);
		if($users->accountLogin()===TRUE):
			header("Location: /");
			exit;
		else:
			//include_once "common/header.php";
?>
		    	
		<h2>Login Failed&mdash;Try Again?</h2>
		<form method="post" action="login.php" name="loginform" id="loginform">
			<div>
				<input type="text" name="username" id="username" />
				<label for="username">Email</label>
				<br /><br />
				<input type="password" name="password" id="password" />
				<label for="password">Password</label>
				<br /><br />
				<input type="submit" name="login" id="login" value="Login" class="button" />
				<input type="hidden" name="token"
					value="<?php echo $_SESSION['token']; ?>" />
			</div>
		</form>
		<p><a href="/php/password.php">Did you forget your password?</a></p>
<?php
		endif;
	else:
		//include_once "common/header.php";
?>
		      
		<form method="post" action="login.php" name="loginform" id="loginform">
			<div>
				<input type="text" name="username" id="username" />
				<label for="username">Email</label>
				<br /><br />
				<input type="password" name="password" id="password" />
				<label for="password">Password</label>
				<br /><br />
				<input type="submit" name="login" id="login" value="Login" class="button" />
				<input type="hidden" name="token"
					value="<?php echo $_SESSION['token']; ?>" />
			</div>
		</form><br /><br />
		<p><a href="/password.php">Did you forget your password?</a></p>
<?php
	endif;
?>

		<div style="clear: both;"></div>
<?php
	include_once "php/common/close.php";
?>
