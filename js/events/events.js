// Display login modal window
$('.toLogin').on('click', function() {

  if (this.text === "LOG OUT") {
    LCB.controller.signout();
  } else {
    $('#login').toggle();
  }
});

// Close login window
$('#login span').on('click', function() {
  $('#login').toggle();
});

// Create account or signin
// DMZ question: not sure if pw should be hashed here or if plain
// pw should be passed to model for hashing...
$('#login button').on('click', function(e) {
  var id = this.id;
  var userInfo = {};

  if (id === "signin_first") {
    userInfo.name = $('#name_set').val();
    userInfo.pw = $('#password_set').val();
    userInfo.email = $('#email_set').val();

  } else if (id === "signin_return") {
    userInfo.name = '';
    userInfo.email = $('#email').val();
    userInfo.pw = $('#password').val();
  }

  LCB.controller.signin(userInfo);
});


// For login - toggling between Sign Up and Log In
$('.message a').click(function(){
   $('#login form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// Toggle between showing and hiding the sidebar when clicking the menu icon
$('#menu_icon').on('click', function() {
  $('#mySidebar').toggle();
});

// Hide sidebar if user clicks on any sidebar option (incl 'close')
$('#mySidebar a').on('click', function() {
  $('#mySidebar').hide();
});

// Call fcn to hide/display correct page (home, income, budget...)
$('.swap').on('click', function(e) {
  LCB.view.togglePages(e.target.hash);
});