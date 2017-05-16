// Display login modal window
$('#gotoLogin').on('click', function() {
  $('#login').toggle();
});

// Close login window
$('#login span').on('click', function() {
  $('#login').toggle();
});

// For login - toggling between Sign Up and Log In
$('.message a').click(function(){
   $('#login form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// Create new login
$('#signin_first').on('click', function() {
  // stuff for creating login
  
  // if successful close login window
  $('#login').toggle();
});

// Verify sign in info
$('#signin_return').on('click', function() {
  // stuff to verify sign in
  
  // if successful close login window
  $('#login').toggle();
});

// Toggle between showing and hiding the sidebar when clicking the menu icon
$('#menu_icon').on('click', function() {
  $('#mySidebar').toggle();
});

// Hide sidebar if user clicks on any sidebar option (incl 'close')
$('#mySidebar a').on('click', function() {
  $('#mySidebar').hide();
});
