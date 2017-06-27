// JS code for model

LCB = window.LCB || {};

LCB.model = (function() {
  'use strict';
  
  // Private vars here
  var user = {email: '', name: ''};
  
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
    //

    // Public functions here
    
    signup: function(info, cb) {
      var email = info.email;
      var name = info.name;
      
      cb = cb || function () {};
      
      // TBD: Check email format here rather than doing that in php? faster, I think
      
      // If email format is OK...
      $.ajax({
        method: "POST",
        data: {email, name},
        url: "/test/php/api/signup.php",
        success: function(result){
          cb($.parseJSON(result));
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    login: function(info, cb) {
      var email = info.email;
      var password = info.password;

      cb = cb || function () {};

      // If email format is OK...
      $.ajax({
        method: "POST",
        data: {email, password},
        url: "/test/php/api/login.php",
        success: function(result){
          console.log(result);
          result = $.parseJSON(result);
          
          // Update variables if login was successful
          if (typeof result.name !== "undefined") {
            user.email = result.email;
            user.name = result.name;
          }
          cb(result);
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    signout: function() {
        this.user = {email: '', name: '', hash: ''};

      // other db/backend processing called here

    }

  };
  return publicAPI;
})();