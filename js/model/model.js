/****************************************************
 * Notes on model.js: 
 *
 * Model.js manages data (and view.js updates the DOM).
 *
 * Most of these methods use AJAX calls to get or
 * modify database data. Note that the 'cb' parameter
 * is the callback function - which calls methods
 * in view.js to update the DOM if the AJAX call succeeds.
 *
 * These methods are called by controller.js.
 ****************************************************/

LCB = window.LCB || {};

LCB.model = (function() {
  'use strict';
  
  // Private vars here
  var actSubtotals;
  var budSubtotals;
  
  var dateReset = ''  
  var date = ''; // initialized to current year & mo but user can change
  
  var categSel = 0; // def to 1st category; changes with submenu selection
  var user = {email: '', name: '', e:'', v:'', userID: ''};
  var bud;
  var act;

  // Private functions here
  
  
  function getDateRg() {

    // Use today's date to generate date selector
    var today = new Date();
    var mo = today.getMonth() + 1;
    var cur_year = today.getFullYear();

    mo = mo > 9 ? mo : '0' + mo;  

    // Set date (for selector) to current year & mo and
    date = cur_year + '-' + mo;
    dateReset =  cur_year + '-' + mo;

    var months = [{name: 'January', idx: '01'},
                  {name: 'February', idx: '02'},
                  {name: 'March', idx: '03'},
                  {name: 'April', idx: '04'},
                  {name: 'May', idx: '05'},
                  {name: 'June', idx: '06'},
                  {name: 'July', idx: '07'},
                  {name: 'August', idx: '08'},
                  {name: 'September', idx: '09'},
                  {name: 'October', idx: '10'},
                  {name: 'November', idx: '11'},
                  {name: 'December', idx: '12'}
                 ];
    var date_rg = [];
    var index = 0;

    for (var i = (cur_year - 1); i <= (cur_year + 1); i++) {
      var year = i.toString();
      date_rg[index] = {name: "FULL YEAR " +  year, code: year};
      index++;

      for (var j = 0; j <12; j++) {
        date_rg[index] = {name: months[j].name + ' ' + year,
                          code: year + '-' + months[j].idx};
        index++;
      }

    }

    return date_rg;
  }
  
  // Returns subtotals for a specific category or sub-category
  function getSubtotals(arr, code, name, date, showDetail) {
    var result = {name, code, date, amt: 0};

    // Filter by code/subCode & date
    var data = arr.filter(
      function(obj) {
        return ((obj.subCode.startsWith(code)) 
                && (obj.date.startsWith(date)));
      }
    );

    if (showDetail) {
      result.detail = data;
    }

    result.amt = getSum(data);

    return result;  
  }

  // Returns sum of an array on the 'amt' field, to 2 decimals
  function getSum(arr) {

    return arr.reduce((a,b) => (a + parseFloat(b.amt)), 0)
              .toFixed(2);
  }

  // Initialize data variables (actual & budget data empty)
  function initData() {

    // Initializes data array to empty
    return [];

  }
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
    

    // Public functions here  

    // Calculates subtotal and detail info, 
    // based on selected date
    calcSubtotals: function (arr) {
      var CAT = this.CAT;
      var subtotals = [];

      for (var i = 0, l = CAT.length; i < l ; i++) {  

        // Get category totals
        subtotals[i] = getSubtotals(arr, CAT[i].code, 
                        CAT[i].name, date, false);

        // Get Sub-category totals:
        subtotals[i].sub = [];

        for (var j = 0, k = CAT[i].sub.length; j < k ; j++) {
          subtotals[i].sub[j] = getSubtotals(arr, CAT[i].sub[j].code,
                                CAT[i].sub[j].name, date, true);
        }
      }
      return subtotals;
    },
    
    changeDate: function(dateSel, cb) {
      date = dateSel;

      // Update subtotals for current date
      actSubtotals = this.calcSubtotals(act);
      budSubtotals = this.calcSubtotals(bud);

      // Callback refreshes data detail for selected date
      cb({actSubByCat: actSubtotals[categSel], budSubByCat: budSubtotals[categSel]});
    },
    
    checkUrl: function(urlInfo, cb) {

      cb = cb || function () {};
      
      $.ajax({
        method: "POST",
        data: {e: urlInfo.e, v: urlInfo.v},
        url: "php/api/checkUrl.php",
        success: function(result){

          // Update variables if login was successful
          if (result.hasOwnProperty('user')) {
            user.email = result.user.email;
            user.name = result.user.name;
          }

          cb(result);
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });        
    },

    filterData: function(index, cb) {
      categSel = index;
      cb({actSubByCat: actSubtotals[categSel], budSubByCat: budSubtotals[categSel], date});
    },
    
    initialize: function (cb) {
      
      // Get current date & range for selector and default date
      var date_rg = getDateRg();
      
      // Initialize data arrays to empty
      act = initData();
      bud = initData();
      
      // Initialize subtotals
      actSubtotals = this.calcSubtotals(act);
      budSubtotals = this.calcSubtotals(bud);
      
      cb(date_rg, this.date);
    },
      
    // TBD: I think we decided that we will also return actual and budget data 
    // in the 'result' object that AJAX returns for login 
    login: function(userInfo, cb) {
      var email = userInfo.email;
      var password = userInfo.password;
      var that = this;
      
      // Reset date
      date = dateReset;

      cb = cb || function () {};

      $.ajax({
        method: "POST",
        data: {email, password},
        url: "php/api/login.php",
        success: function(result){
          console.log('RESULT FROM LOGIN');
          console.log(result);

          // Update variables if login was successful
          if (result.hasOwnProperty('user')) {
            var res = {};
            
            user = result.user;
            categSel = 0;
            
            cb({user, categSel});

          } else {
            console.log('error with log in');
          }
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    logout: function() {
      user = {email: '', name: '', e:'', v:'', userID: ''}
      
      // Initialize data arrays to empty
      act = initData();
      bud = initData();
      
      // Initialize subtotals
      actSubtotals = this.calcSubtotals(act);
      budSubtotals = this.calcSubtotals(bud);

      // TBD: other db/backend processing?
    },
    requestReset: function(userInfo, cb) {
      var email = userInfo.email;
      
      cb = cb || function () {};
      
      // If email format is OK...
      $.ajax({
        method: "POST",
        data: {email},
        url: "php/api/requestReset.php",
        success: function(result){
          console.log(result);
          cb(result);
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    sendExpense: function(expenseData, cb) {
      cb = cb || function () {};
      expenseData.userID = user.userID;

      // TBD: continue with cb fcn when php returns updated actual or budget data
      // need to update view
      $.ajax({
        method: "POST",
        data: expenseData,
        url: "http://totalfinance-api.herokuapp.com/api/v1/actual/1",
        success: function(result){
          console.log(result);
          cb(result);
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });            
    },
    setPassword: function(userInfo, cb) {
      cb = cb || function () {};
      
      $.ajax({
        method: "POST",
        data: {v: userInfo.v, password: userInfo.password},
        url: "php/api/setPassword.php",
        success: function(result){
          console.log(result);
          cb(result);
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
        url: "php/api/signup.php",
        success: function(result){
          console.log('success with signup.php and result is:');
          console.log(result);
          cb(result);
        },
        error: function(xhr, status, error) {
          alert('ajax ERROR: ' + error);
        }
      });      
    },
    updateData: function(dtype, user, cb) {
      var that = this;
      //TBD adapt to use user id from var user.userID
      
      $.ajax({
        method: "GET",
        url: "http://totalfinance-api.herokuapp.com/api/v1/" + dtype + "/" + user ,
        success: function(result){
          var catSubtotals = {};
          
          console.log(result);

          if (dtype === "actual") {
            if (result !== null) {
              act = result;

            } else {

              // If result is null, re-initialize variable
              act = initData();            
            }

            // Update subtotals for current date
            actSubtotals = that.calcSubtotals(act);

            // Get subtotals for currently selected category
            catSubtotals = actSubtotals[categSel];

          } else if (dtype === "budget") {
            if (result !== null) {
              bud = result;

            } else {

              // If result is null, re-initialize variable
              bud = initData();            
            }

            // Update subtotals for current date
            budSubtotals = that.calcSubtotals(bud);

            // Get subtotals for currently selected category
            catSubtotals = budSubtotals[categSel];
          }
          
          // Pass subtotals for current category to callback
          cb(catSubtotals, date);
        },
        error: function () {
          console.log('error');
        }
      });    
    }
  };
  return publicAPI;
})();