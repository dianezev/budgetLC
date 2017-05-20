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
    }
  
  };
  return publicAPI;
})();