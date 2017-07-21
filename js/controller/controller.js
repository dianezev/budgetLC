/****************************************************
 * Notes on controller.js: 
 * All of these methods call other methods in BOTH model.js
 * (for data management) and view.js (for DOM update).
 *
 * Note that generally the 'view.___()' methods
 * are passed in as callback functions because
 * the AJAX calls in 'model.___()' methods need
 * to return results to view.___.
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
      model.changeDate(date, function (result) {

        // Show actual & budget detail for user
        view.refreshDetail(result.actSubByCat, "actual", date);
        view.refreshDetail(result.budSubByCat, "budget", date);          
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

      model.filterData(index, function (result) {
        console.log('filterData returns:');
        console.log(result);
        view.makeActiveCateg(index + 1);
        view.refreshDetail(result.actSubByCat, "actual", result.date);
        view.refreshDetail(result.budSubByCat, "budget", result.date);
        view.refreshSummary(result);
      });
      
      // view.refreshDetail(actSubtotals, "actual");
    },
    
    // Set dates in date selectors and initialize data arrays (empty)
    initialize: function() {
      model.initialize(function(dateArray, date) {
        view.fillDateRg(dateArray, date);
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
          model.updateData("actual", result.user.userId, function (actSubtotals, date) {
            view.refreshDetail(actSubtotals, "actual", date);

            /*
             * Nest this call to update budget data so that when it completes
             * we are sure that actual data (above) is also complete -
             * then it will work to call view.refreshSummary which uses both
             */
            // TBD: change "actual" here to "budget" when url for budget is in place
            model.updateData("budget", result.user.userId, function (budSubtotals, date) {
              view.refreshDetail(budSubtotals, "budget", date);
              view.refreshSummary(actSubtotals, budSubtotals);        
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
      var amt = $('#amt_' + dtype).val();
      var detail = $('#det_' + dtype).val();
      var expenseData = {subCode, date, amt, detail};

      model.sendExpense(expenseData, function (result) {
        // maybe improve later: instead of getExpenses, could just add a new object to the actual or budget array, then recalc subtotals, etc.
  

// LEFT OFF HERE: check back with Michael on this - were we going to nest a model
        // cb within model and then nest a view cb?
// revise to make second model call before refresh
//        model.getExpenses( sdf, fcn() {
//          view.refresh();
//        }
        // change to refresh detail
        //view.userMsg(result);
      });
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