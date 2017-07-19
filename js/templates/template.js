LCB = window.LCB || {};

LCB.template = (function() {
    'use strict';   
    
    // misc example
    var _tplButton = _.template('<div class="btn-group" role="group">' +
                                    '<button type="button" class="btn btn-default" ' +
                                            'value=<%= propVal %>><%= buttonVal %>' +
                                    '</button>' +
                                '</div>');
    
  
    var publicAPI = {
      
        // misc example
        getButtonsHTML: function(start, rows, buttonsPerRow) {
            var numbersHTML = '';
            var buttonVal;
            var propVal;

            for (var i = 0; i < rows; i++) {
                numbersHTML += 
                        '<div class="numberButtons btn-group ' +
                                'btn-group-justified" role="group">';

                for (var j = 0; j < buttonsPerRow; j++) {
                    buttonVal = (i * buttonsPerRow) + (start + j);
                    propVal = (i * buttonsPerRow) + (j + 1);
                    numbersHTML += _tplButton({propVal: propVal, 
                                        buttonVal: buttonVal});
                }
                numbersHTML += '</div>';
            }
            return numbersHTML;            
        }
    };

    return publicAPI;
})();
