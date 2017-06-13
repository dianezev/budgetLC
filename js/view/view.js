// JS code for view

LCB = window.LCB || {};

LCB.view = (function() {
  'use strict';
  
  // Private vars here
  //
  //
  //
  
  
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
      $('[id^="m_"]').hide();
      $(hash).show();
    },
    userAcct: function(user) {
      var menuItem;
      
      if (user === null) {
        $('a.toLogin').text('LOG IN/SIGN UP');
        $('#myNavbar div a:first-child').hide();
        $('#mySidebar a:nth-child(2)').hide();
      
      } else {
        $('a.toLogin').text('LOG OUT');
        $('#myNavbar div a:first-child span').text(' ' + user.name);
        $('#mySidebar a:nth-child(2) span').text(' ' + user.name);
        $('#myNavbar div a:first-child').show();
        $('#mySidebar a:nth-child(2)').show();
        $('#myNavbar div a:nth-child(3)').text('myAccount');
        $('#mySidebar a:nth-child(3)').text('myAccount');
      }
      
    },
    userVerify: function(user) {

      // TBD: display should prompt user to check email & complete verification
      alert("Please check your email for a verification link");
    }
  };
  return publicAPI;
})();
