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
    signin: function(info) {
      
      // If FIRST time to sign-in,
      // check input and send email verification
      if (info.name !== '') {
        model.signup(info, function (data) {
          view.userVerify(data);
        });
        
      // Otherwise verify email & hashed pw in db
      } else {
        model.login(info, function (data) {
          view.userAcct(data);
        });      
      }

      // TBD: if successful close login window
      $('#login').toggle();
    },
    signout: function() {
      
      model.signout();
      view.userAcct(null);
    }

  
  };
  return publicAPI;
})();
