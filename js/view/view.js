// JS code for view

LCB = window.LCB || {};

LCB.view = (function() {
  'use strict';
  
  // Private vars here

  // Private functions here
    // Displays message in modal window
  function showMsg(msg) {
      $('#userMsg p').text(msg);
      $('#userMsg').show();
      $('#userMsg button').focus();
  }
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
    
    

    // Public functions here
    defDate: function() {
      var date = new Date();

      $('.dateOpt').attr('value', date.getFullYear().toString() +
                         '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
                         '-' + ('0' + date.getDate().toString()).slice(-2));
    },
    togglePages: function(hash) {
      // If no hash spec'd, default to start screen
      hash = hash || '#m_home';
      
      $('[id^="m_"]').hide();
      $(hash).show();
    },
    // Note this is called for login/logout
    userAcct: function(user) {
      var name;
      var menuItem;
      
      $('#m_register').hide();
      
      // If user chose 'Logout' result should be null
      if (result === null) {
        this.togglePages();
        $('a.toLogin').text('LOG IN/SIGN UP');
        $('#myNavbar div a:first-child').hide();
        $('#mySidebar a:nth-child(2)').hide();
      
      // If user successfully signed in, update menu
      } else if (result.hasOwnProperty('user')) {
        name = result.user.name.toUpperCase();
        $('a.toLogin').text('LOG OUT');
        $('#myNavbar div a:first-child span').text(' ' + name);
        $('#mySidebar a:nth-child(2) span').text(' ' + name);
        $('#myNavbar div a:first-child').show();
        $('#mySidebar a:nth-child(2)').show();
        //$('#myNavbar div a:nth-child(3)').text('myAccount');
        //$('#mySidebar a:nth-child(3)').text('myAccount');
      }
      // If error occurred during login, display modal window
      else {
        showMsg(result.err_msg);
      }      
      
    },
            /*
    userVerify: function(user) {

      // TBD: display should prompt user to check email & complete verification
      alert("Please check your email for a verification link");
    }
    */
    userMsg: function(result) {
      var msg = (result.hasOwnProperty('msg'));)
                ? result.msg
                : result.err_msg;
      
      showMsg(msg);
    },
    
    // Note this is called with 
    // email verification link
    userVerify: function(result) {

      // Prompt user to create/reset password
      if (result.hasOwnProperty('user')) {
          $('#password_prompt').show();        

      // If error occurred display msg
      } else {
        showMsg(result.err_msg);
      }
    
  };
  return publicAPI;
})();
