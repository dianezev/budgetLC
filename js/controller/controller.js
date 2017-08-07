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
      model.changeDate(date, function (subtotals, categ) {
        console.log('model.changeDate returned date: ' + date + ' and subtotals[categ]:');
        console.log(subtotals[categ]);

        // Show actual & budget detail for user
        view.setDate(date);
        view.refreshDetail(subtotals[categ].actual, "actual");
        view.refreshDetail(subtotals[categ].budget, "budget");
        view.refreshSummary(subtotals);
      });      
    },
    
    // Chart fcn in chartBar.js adapted from https://bl.ocks.org/mbostock/3887051
    chartBar: function(sel) {
      model.getChartSubtotals(function (result) {
        view.chart(sel, "chartBar", result);
      });          
    },
    
    // Called during intialization by script.js
    checkUrl: function() {
      var urlInfo = getAllUrlParams();
      console.log('in c.checkUrl and urlInfo is:');
      console.log(urlInfo);
      
      // If url contains params, verify account & get user info
      if ((urlInfo.hasOwnProperty('e')) && (urlInfo.hasOwnProperty('v'))) {
        model.checkUrl(urlInfo, function (result) {
          view.userVerify(result);
        });      
      }
    },
    
    // Called when user chooses a category from sub-menu of actual, budget or summary pages
    chooseCategory: function(that) {
      console.log('in chooseCategory and that is" ');
      console.log(that);
      var parent_id = $(that).parent().attr("id");
      var categories = $('#' + parent_id + ' a');
      var index = categories.index(that);
      
      model.filterData(index, function (subtotals, categ) {
        view.makeActiveCateg(index + 1, subtotals[categ].actual.sub);
        view.refreshDetail(subtotals[categ].actual, "actual");
        view.refreshDetail(subtotals[categ].budget, "budget");
        view.refreshSummary(subtotals);
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
      view.clearEntry();
      view.togglePages('#m_home');
      view.makeActiveCateg(1, model.CAT[0].sub);
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
        
        console.log('in controller.register & about to call model.login. userInfo is');
        console.log(userInfo);
        
        // If login is successful, get user data and update view
        model.login(userInfo, function (result) {
          console.log('model.login returned:');
          console.log(result);
          
          if (result.pass === false) {   
            view.userMsg(result);
          } else {
            view.userAcct(result);
            view.setDate(result.date);
            model.getData("actual", function (subtotals, categ) {
              console.log('LOGIN: model.getData for actual returned subtotals[categ]:');
              console.log(subtotals[categ].actual);
              view.refreshDetail(subtotals[categ].actual, "actual");

              /*
               * Nest this call to update budget data so that when it completes
               * we are sure that actual data (above) is also complete -
               * then call view.refreshSummary which uses both
               */
              model.getData("budget", function (subtotals, categ) {
                console.log('LOGIN: model.getData for budget returned subtotals[categ]:');
                console.log(subtotals[categ].budget);
                view.refreshDetail(subtotals[categ].budget, "budget");
                view.refreshSummary(subtotals); 
                view.userMsg("Welcome to Total Finance, " + result.user.name + "!");
              });
            });
          }
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
        view.clearEntry();
      
      // Otherwise submit expense data
      } else {
      
        model.sendExpense(expenseData, function (result) {
          // maybe improve later: instead of getExpenses, could just add a new object to the actual or budget array, then recalc subtotals, etc.

          model.getData(dtype, function (subtotals, categ) {
            view.clearEntry();
            view.refreshDetail(subtotals[categ][dtype], dtype);
            view.refreshSummary(subtotals);
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
    updateSummary: function() {
      model.updateSummary(function(result) {
        view.refreshSummary(result);
      });
    },
    handleDetail: function(id) {
      console.log(id);
      view.toggleDetail(id);
    }
  };
  return publicAPI;
})();