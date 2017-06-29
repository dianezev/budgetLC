// JS code for model

LCB = window.LCB || {};

LCB.model = (function() {
  'use strict';
  
  // Private vars here  
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
    //
    user = {email: '', name: '', e:'', v:''};

    // Public functions here
    
    checkUrl: function(urlInfo, cb) {
      var that = this;
      
      cb = cb || function () {};
      
      $.ajax({
        method: "POST",
        data: {e: urlInfo.e, v: urlInfo.v},
        url: "/test/php/api/checkUrl.php",
        success: function(result){
          result = $.parseJSON(result);

          // Update variables if login was successful
          if (result.hasOwnProperty('user')) {
            that.user.email = result.user.email;
            that.user.name = result.user.name;
          }

          cb(result);
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    login: function(userInfo, cb) {
      var email = userInfo.email;
      var password = userInfo.password;
      var that = this;

      cb = cb || function () {};

      // If email format is OK...
      $.ajax({
        method: "POST",
        data: {email, password},
        url: "/test/php/api/login.php",
        success: function(result){
          result = $.parseJSON(result);
          
          // Update variables if login was successful
          if (result.hasOwnProperty('user')) {
            that.user.email = result.user.email;
            that.user.name = result.user.name;
          }
          cb(result);
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    logout: function() {
        this.user = {email: '', name: '', hash: ''};

      // other db/backend processing called here

    },
      setPassword: function(userInfo, cb) {
      cb = cb || function () {};
      
      $.ajax({
        method: "POST",
        data: {v: userInfo.v, password: userInfo.password},
        url: "/test/php/api/setPassword.php",
        success: function(result){
          cb($.parseJSON(result));
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    signup: function(userInfo, cb) {
      var email = userInfo.email;
      var name = userInfo.name;
      
      cb = cb || function () {};
      
      // TBD: Check email format here rather than doing that in php? faster?
      
      // If email format is OK...
      $.ajax({
        method: "POST",
        data: {email, name},
        url: "/test/php/api/signup.php",
        success: function(result){
          console.log(result);
          cb($.parseJSON(result));
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });

  };
  return publicAPI;
})();
