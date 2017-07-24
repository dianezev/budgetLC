/****************************************************
 * Notes on controller.js: 
 * All of these methods call other methods in BOTH model.js
 * (for data management) and view.js (for DOM update).
 *
 * Note that generally the 'view.___()' methods
 * are passed in as callback functions because
 * the AJAX calls made in 'model.___()' returns
 * results to view.___.
 ****************************************************/

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
    // TBD: Settings options
    
    // Called when user changes date selector
    changeDate: function(date) {
      model.changeDate(date, function (categSubtotals) {

        // Show actual & budget detail for user
        view.setDate(date);
        view.refreshDetail(categSubtotals.actual, "actual");
        view.refreshDetail(categSubtotals.budget, "budget");
        view.refreshSummary(categSubtotals);
      });      
    },
    
    // Called during intialization by script.js
    checkUrl: function() {
      var urlInfo = getAllUrlParams();
      
      // If url contains params, verify account & get user info
      if ((urlInfo.hasOwnProperty('e')) && (urlInfo.hasOwnProperty('v'))) {
        model.checkUrl(urlInfo, function (result) {
          view.userVerify(result);
        });      
      }
    },
    
    // Called when user chooses a category from sub-menu of actual, budget or summary pages
    chooseCategory: function(that) {
      var parent_id = $(that).parent().attr("id");
      var categories = $('#' + parent_id + ' a');
      var index = categories.index(that);
      
      model.filterData(index, function (categSubtotals) {
        console.log('filterData returns:');
        console.log(categSubtotals);
        view.makeActiveCateg(index + 1, categSubtotals.actual.sub);
        view.refreshDetail(categSubtotals.actual, "actual");
        view.refreshDetail(categSubtotals.budget, "budget");
        view.refreshSummary(categSubtotals);
      });
    },
    
    // Set dates in date selectors and initialize data arrays (empty)
    initialize: function() {
      model.initialize(function(dateArray, date) {
        view.fillDateRg(dateArray);
        view.setDate(date);
      });
    },
    
    logout: function() {  
      model.logout();
      view.userAcct(null);
    },
    
    // Called when user submits login or sign up info
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
        // TBD: add validation - not working when user fails to provide email/name
        userInfo.email = $('#email').val();
        userInfo.password = $('#password').val();
        $('#password').val('');

        // If login is successful, get user data and update view
        model.login(userInfo, function (result) {
          view.userAcct(result);
          view.setDate(result.date);
          model.getData("actual", function (categSubtotals) {
            view.refreshDetail(categSubtotals.actual, "actual");

            /*
             * Nest this call to update budget data so that when it completes
             * we are sure that actual data (above) is also complete -
             * then call view.refreshSummary which uses both
             */
            model.getData("budget", function (categSubtotals) {
              view.refreshDetail(categSubtotals.budget, "budget");
              view.refreshSummary(categSubtotals);        
            });
          });
        });
      }
    },
    
    // Called when user enters email address in order to reset pw
    requestReset: function() {
      var userInfo = {};
      
      // TBD: add validation?
      userInfo.email = $('#email_ver').val();

      model.requestReset(userInfo, function (result) {
        view.userMsg(result);
      });
    },
    
    // Called when user submits expense data
    sendExpense: function(dtype) {
      var id = '#m_' + dtype;
      var subCode = $(id + ' .entry select').val();
      var date = $(id + ' input.dateOpt').val();
      var amt = parseFloat($('#amt_' + dtype).val()).toFixed(2);
      var detail = $('#det_' + dtype).val();
      var expenseData = {subCode, date, amt, detail, dtype};
      
      // If amount entered is invalid, alert user
      if ((amt === "NaN") || (amt === "0.00")) {
        view.userMsg("The amount is not valid. Please try again.");
      
      // Otherwise submit expense data
      } else {
      
        model.sendExpense(expenseData, function (result) {
          // maybe improve later: instead of getExpenses, could just add a new object to the actual or budget array, then recalc subtotals, etc.

          model.getData(dtype, function (categSubtotals) {
            view.refreshDetail(categSubtotals[dtype], dtype);
            view.refreshSummary(categSubtotals);
          });
        });
      }
    },
    
    // Called when user confirms a new password
    setPassword: function() {      
      var password = $('#password1').val();
      var userInfo = {};

      if (password === $('#password2').val()) {
        userInfo = getAllUrlParams();
        userInfo.password = password;
        $('#password_prompt').hide();

        // Add password to user table & alert user
        model.setPassword(userInfo, function (result) {
          view.userMsg(result);
        });
      } else {
          // TBD: improve ui
          alert('passwords DO NOT match');
      }      
    },
    handleDetail: function(id) {
      console.log(id);
      view.toggleDetail(id);
    }
  };
  return publicAPI;
})();