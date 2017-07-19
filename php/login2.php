<?php
	include_once "php/common/base.php";

	if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['userEmail'])):
?>
		<!--Make this a popup inside current modal class-->
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
		$users = new TotalFinanceUsers($db);
		if($users->accountLogin()===TRUE):
			header("Location: /");
			exit;
		else:
?>
			<div id="login" class="w3-modal">
				<div class="w3-modal-content form">
					<h2>Login Failed&mdash;Try Again?</h2>
					<form class="login-form" action="php/login.php" method="POST">
						<input id="email" type="text" name="userEmail" placeholder="Email"/>
						<input id="password" type="password" name="userPW" placeholder="Password"/>
						<button type="button" class="w3-button w3-black" id="signin_return">login</button>
						<p><a href="/php/password.php">Did you forget your password?</a></p>
						<p class="message">Not registered? <a href="#login">Create an account</a></p>
						<input type="hidden" name="token" value="<?php echo $_SESSION['token']; ?>" />
					</form>
				</div>
			</div>
<?php
		endif;

	include_once "php/common/close.php";
?>
