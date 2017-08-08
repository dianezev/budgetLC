/****************************************************
 * Notes on events.js: 
 * 1) Some events need to access or change the database
 *    and then make updates to the DOM that reflect those 
 *    results. This kind of event will call a method
 *    in controller.js.
 * 2) Any events that only update
 *    the DOM will call a method in view.js.
 ****************************************************/

// Log in/Sign up/Log out
$('.toLogin').on('click', function() {
  if (this.text === "LOG OUT") {
    LCB.controller.logout();
  } else {
    LCB.view.showModal('#register');
  }
});

// Close login/signup window - click 'x'
$('#register span').on('click', function() {
  LCB.view.hideModal('#register');
});

// Close reset PW window - click 'x'
$('#getEmail span').on('click', function() {
  LCB.view.hideModal('#getEmail');
});

// Close reset PW window - click 'x'
$('#password_prompt span').on('click', function() {
  LCB.view.hideModal('#password_prompt');
});

// Close user msg window - click 'x'
$('#userMsg span, #userMsg button').on('click', function() {
  LCB.view.hideModal('#userMsg');
});

// Log in or Sign up
$('#register button').on('click', function(e) {
  LCB.controller.register(this.id);
});

// Get user email, so that re-activation link can be sent
$('#getEmail button').on('click', function(e) {
  LCB.controller.requestReset();
});

// Establish or reset password for account
$('#password_prompt button').on('click', function() {
    LCB.controller.setPassword();
});

// Submit expense
$('#m_actual button, #m_budget button').on('click', function(e) {
  e.preventDefault();
  LCB.controller.sendExpense(this.name);
});

// Change user settings 
$('#m_settings button').on('click', function(e) {
  e.preventDefault();
  alert('triggered settings button');
  // TBD
});

// View summary 
// TBD maybe this can be dropped because I think summary update is called at 
// other times (change date, etc) so that it should always be current
$('[href="#m_summary"]').on('click', function(e) {
  //e.preventDefault();
  
  //LCB.controller.updateSummary();
});

// For login - toggling between Sign Up and Log In
// TBD: incorporate the change password stuff into this
$('[id^="goto"]').click(function(){
  LCB.view.animateModal('#register form');
});

// To reset password if user forgot
$('#requestPasswordReset a').click(function(){
    LCB.view.hideModal('#register');
    LCB.view.showModal('#getEmail');
});

// Toggle between showing and hiding the sidebar when clicking the menu icon
// Also hide sidebar if user clicks on any sidebar option (incl 'close')
$('#menu_icon, #mySidebar a').on('click', function() {
  LCB.view.toggleItem('#mySidebar');
});

// Click on main menu - calls fcn to hide/display correct page (home, actual, budget...)
$('.swap, .swap i, .swap span').on('click', function(e) {
  LCB.view.togglePages(e.currentTarget.hash);
});

// Click on sub-menu  under 'Actual', 'Budget' or 'Summary' pages
// Note: make them work in sync - clicking on 'Food' under 'Actual' changes the
// active option to 'Food' under 'Budget' & 'Summary' as well
$('.subMenu a').on('click', function(e) {
  LCB.controller.chooseCategory(this);
  LCB.controller.chartUpdate('svg');
});

$('footer a').on('click', function() {
  LCB.view.toTop();
});

// For drop down of detailed actual & budget data
$('.categ').on('click', 'li', function() {
    LCB.controller.handleDetail(this.id);
});

// Change date selection
$('[id^="date_"]').bind('change', function(e) {
  console.log($(e.target).val());
  LCB.controller.changeDate($(e.target).val());
  LCB.controller.chartUpdate('svg');
});