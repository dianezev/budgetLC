<?php
	include_once "php/common/base.php";
?>
		<form action="db-interaction/users.php" method="post">
			<div>
				<input type="hidden" name="action" value="resetpassword" />
				<input type="text" name="userEmail" id="username" />
				<input type="hidden" name="token" value="<?php echo $_SESSION['token']; ?>" />
			</div>
		</form>
<?php
	include_once "php/common/close.php";
?>
