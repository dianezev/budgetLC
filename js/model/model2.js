// JS code for model

LCB = window.LCB || {};

LCB.model = (function() {
  'use strict';
  
  // Private vars here
  //
  //
  //
  
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
    user: {email: '', name: '', hash: ''},

    // Public functions here
    
    // DMZ question: I don't know if part of login code 
    // goes here or if it
    // will be completely contained in php files...
    // but I'm assuming that somehow we'll set the above
    // 'user' object so it can be referenced by app
    signinFirst: function(info, cb) {
      
      var hashedPW;

      cb = cb || function () {};

      // TBD: Revise to apply hash fcn to PW (here or elsewhere...)
      hashedPW = info.pw;
      
      // TBD: validity checks on pw, email etc - error if invalid
      
      // If valid, add to db and set user object
      // db stuff...
      this.user.name = info.name;
      this.user.email = info.email;
      this.user.hash = hashedPW;

      // Send verification email & return ...
      // DMZ question: get input on callback issues
      // or cb.call(this)??
      cb(this.user);
    },
    signinReturn: function(info, cb) {
      var hashedPW;
      var userName;

      cb = cb || function () {};

      // TBD: Revise to apply hash fcn to PW (here or elsewhere...)
      hashedPW = info.pw;
      
      // TBD: Lookup email & hashed PW in DB, & get name
      userName = 'Diane Z';

      // If found:
      if (userName !== '') {
        this.user.name = userName;
        this.user.email = info.email;
        this.user.hash = hashedPW;
        cb(this.user);      
        
      // return error for email/pw
      } else {
        alert('TBD: error with email or pw');
      }
      
    },
    signout: function() {
        this.user = {email: '', name: '', hash: ''};

      // other db/backend processing called here

    }

  };
  return publicAPI;
})();
