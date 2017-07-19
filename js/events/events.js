// Display Login/Sign in/Sign Out
$('.toLogin').on('click', function() {

  if (this.text === "LOG OUT") {
    LCB.controller.logout();
  } else {
    $('#m_register').toggle();
    $('#m_register button').focus();
  }
});

// Close login/signup window
$('#m_register span').on('click', function() {
  $('#m_register').hide();
});

// Close user msg window - click 'x'
$('#userMsg span').on('click', function() {
  $('#userMsg').hide();
});
// Close user msg window - click button
$('#userMsg button').on('click', function() {
  $('#userMsg').hide();
});

//Login or Signup
$('#m_register button').on('click', function(e) {
  LCB.controller.register(this.id);
});

// Establish or reset password for account
$('#password_prompt button').on('click', function() {
    LCB.controller.setPassword();
});

// For login - toggling between Sign Up and Log In
$('.message a').click(function(){
   $('#m_register form').animate({height: "toggle", opacity: "toggle"}, "slow");
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
$('.swap, .swap i, .swap span').on('click', function(e) {
  console.log(e);
  LCB.view.togglePages(e.currentTarget.hash);
});
