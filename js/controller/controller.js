// JS code for controller

LCB = window.LCB || {};

LCB.controller = (function() {
  'use strict';
  
  // Private vars here
  var model = LCB.model;
  var view = LCB.view;
  
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here

    
    
    // Public functions here
    // TBD: methods for 'Budget' and 'Expenses' menu options
    // Need to decide whether that data is retrieved at login
    // or when these options selected.
    // TBD: Settings stuff, including code to reset password,
    // reset email (should both require activation link sent to // old email?) could expand setPassword below to handle
    // new email if verification code is set to something else.
    // setPassword below should work already for resetting 
    // password - just have to implement option that sends 
    // the email with link. See updateEmail and resetPassword in  // sample code from daniel
    // also delete account option
    // what other settings options to handle?
    checkUrl: function() {
      var urlInfo = getAllUrlParams();
      
      // If url contains params, verify account & get user info
      if ((urlInfo.hasOwnProperty('e')) && (urlInfo.hasOwnProperty('v'))) {
        model.checkUrl(urlInfo, function (result) {
          view.userVerify(result);
        });      
      }
    },
    logout: function() {
      
      model.logout();
      view.userAcct(null);
    },
    register: function(id) {
      var userInfo = {};
      
      if (id === "signup_now") {
        // TBD: add validation?
        userInfo.name = $('#name_set').val();
        userInfo.email = $('#email_set').val();
        
        model.signup(userInfo, function (result) {
          view.userMsg(result);
        });

      } else if (id === "login_now") {
        // TBD: add validation
        userInfo.email = $('#email').val();
        userInfo.password = $('#password').val();

        model.login(userInfo, function (result) {
          console.log('in contr & model.login returned:');
          console.log(result);
          view.userAcct(result);
        });      
      }
    },
    setPassword: function() {      
      var password = $('#password1').val();
      var userInfo = {};

      if (password === $('#password2').val()) {
        userInfo = getAllUrlParams();
        userInfo.password = password;
        $('#password_prompt').hide();

        // Add password to user table & alert user
        model.setPassword(userInfo, function (result) {
          console.log(result);
          view.userMsg(result);
        });
      } else {
          // TBD: improve ui
          alert('passwords DO NOT match');
      }      
    }
  };
  return publicAPI;
})();
