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
  var COLORS = model.COLORS;
  
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here

    
    
    // Public functions here
    // TBD: Settings options
    
    // Called when user changes date selector
    changeDate: function(date) {
      model.changeDate(date, function (subtotals, categ, chartData) {

        // Show actual & budget detail for user
        view.setDate(date);
        view.refreshDetail(subtotals[categ].actual, "actual");
        view.refreshDetail(subtotals[categ].budget, "budget");
//        view.chartBar("svg", chartData.bar);
        view.donut3D.transition("budgetDonut", chartData.donut.budget, 0.4);  // old args: ("budgetDonut", chartData.donut.budget, 130, 100, 30, 0.4)
        view.donut3D.transition("actualDonut", chartData.donut.actual, 0);  // old args: ("actualDonut", chartData.donut.actual, 130, 100, 30, 0)
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
      var parent_id = $(that).parent().attr("id");
      var categories = $('#' + parent_id + ' a');
      var index = categories.index(that);
      
      model.filterData(index, function (subtotals, categ, chartData) {
        view.makeActiveCateg(index + 1, subtotals[categ].actual.sub);
        view.refreshDetail(subtotals[categ].actual, "actual");
        view.refreshDetail(subtotals[categ].budget, "budget");
//        view.chartBar("svg", chartData.bar);
        view.donut3D.transition("budgetDonut", chartData.donut.budget, 0.4);
        view.donut3D.transition("actualDonut", chartData.donut.actual, 0);
      });
    },

    handleDetail: function(id) {
      view.toggleDetail(id);
    },
    
    // Set dates in date selectors and initialize data arrays (empty)
    initialize: function() {
      model.initialize(function(dateArray, date) {
        view.fillDateRg(dateArray);
        view.setDate(date);
        view.setAvailWidth();
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
        $('#register').hide();
        $('#waitSymbol').show();

        model.signup(userInfo, function (result) {
          view.userMsg(result);
        });

      } else if (id === "login_now") {
        // TBD: add validation - not working when user fails to provide email/name
        userInfo.email = $('#email').val();
        userInfo.password = $('#password').val();
        $('#password').val('');
        $('#register').hide();
        // TBD: apply waitSymbol for other AJAX calls
        $('#waitSymbol').show();
        
        // If login is successful, get user data and update view
        model.login(userInfo, function (result) {
          
          if (result.pass === false) {   
            view.userMsg(result);
          } else {
            view.userAcct(result);
            view.setDate(result.date);
            model.getData("actual", function (subtotals, categ, chartData) {
              view.refreshDetail(subtotals[categ].actual, "actual");

              /*
               * Nest this call to update budget data so that when it completes
               * we are sure that actual data (above) is also complete -
               */
              model.getData("budget", function (subtotals, categ, chartData) {
                view.refreshDetail(subtotals[categ].budget, "budget");
//                view.chartBar("svg", chartData.bar);
                view.donut3D.draw("budgetDonut", chartData.donut.budget, view.availWidth, 1, 0.4, COLORS);
                view.donut3D.transition("budgetDonut", chartData.donut.budget, 0.4);
                view.donut3D.draw("actualDonut", chartData.donut.actual, view.availWidth, 2, 0, COLORS);
                view.donut3D.transition("actualDonut", chartData.donut.actual, 0);
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
      
      // TBD: add validation
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
          model.getData(dtype, function (subtotals, categ, chartData) {
            view.clearEntry();
            view.refreshDetail(subtotals[categ][dtype], dtype);
//            view.chartBar("svg", chartData.bar);
            view.donut3D.transition("budgetDonut", chartData.donut.budget, 0.4);
            view.donut3D.transition("actualDonut", chartData.donut.actual, 0);
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
  };
  return publicAPI;
})();