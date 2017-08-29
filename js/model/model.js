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

/***********************************************
 * TBD: Less redundancy if subtotal object is revised so that code and name are properties at 
 *      same level as actual & budget. Also better to have date as it's own prop at root of object.
 *
 *       subtotals[0] = {actual: {amt: 123, sub: [...]}, budget: {amt: 123, sub: [...]}, 
 *                      code: "hous", name: "Household", and MAYBE date: "2017-07"}
 *
 *       (or even better to move date out of subtotals and work with:
 *       result = {date: "2017-07", subtotals: [...]}
 *************************************************/

LCB = window.LCB || {};

LCB.model = (function() {
  'use strict';
  
  // for testing only
//   var host = "https://budgetlc.herokuapp.com/";
  var host = "/";  //DMZ using /totfin/ instead of /
  
  // Private vars here
  var subtotals = [];
  var chartData = {};
  
  var dateReset = ''  
  var date = ''; // initialized to current year & mo but user can change
  
  var categSel = 0; // def to 1st category; changes with submenu selection
  var user = {email: '', name: '', e:'', v:'', userId: ''};
  var bud;
  var act;

  var authToken;
  
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

    // Calculates data needed for various charts, based on 'subtotals' var
    // TBD: add more name value pairs to the object that gets returned, as
    // needed for each type of chart
    calcChartData: function () {
      var donut = {actual: [], budget: []};
      var bar = [];
      var COLORS = this.COLORS;

      // Create object needed for donut chart:
      for (var i = 0, l = subtotals.length ; i < l ; i++) {
        donut.actual[i] = { label: subtotals[i].actual.name, 
                      value: +subtotals[i].actual.amt, 
                      color: COLORS[i] };
        donut.budget[i] = { label: subtotals[i].budget.name, 
                      value: +subtotals[i].budget.amt, 
                      color: COLORS[i] };
      }

      // Create array needed for bar chart:
      for (var i = 0, l = subtotals.length; i < l; i++) {
        bar[i] = {};
        bar[i].Budget = +subtotals[i].budget.amt; 
        bar[i].Actual = +subtotals[i].actual.amt;
        bar[i].Categ = subtotals[i].budget.name;
      }
      return {donut, bar};
    },

    
    // Calculates subtotal and detail info, 
    // based on selected date
    calcSubtotals: function () {
      var CAT = this.CAT;
      var subs = [];

      for (var i = 0, l = CAT.length; i < l ; i++) {  
        subs[i] = {actual:{}, budget: {}};

        // Get category totals
        subs[i].actual = getSubtotals(act, CAT[i].code, 
                        CAT[i].name, date, false);
        subs[i].budget = getSubtotals(bud, CAT[i].code, 
                        CAT[i].name, date, false);

        // Get Sub-category totals:
        subs[i].actual.sub = [];
        subs[i].budget.sub = [];

        for (var j = 0, k = CAT[i].sub.length; j < k ; j++) {
          subs[i].actual.sub[j] = getSubtotals(act, CAT[i].sub[j].code,
                                CAT[i].sub[j].name, date, true);
          subs[i].budget.sub[j] = getSubtotals(bud, CAT[i].sub[j].code,
                                CAT[i].sub[j].name, date, true);
        }
      }
      return subs;
    },
    
    changeDate: function(dateSel, cb) {
      date = dateSel;

      // Update subtotals for current date
      subtotals = this.calcSubtotals();
      chartData = this.calcChartData();
      console.log('in model.changeDate and new subtotals are:');
      console.log(subtotals);

      // Callback refreshes data detail for selected date
      cb(subtotals, categSel, chartData);
    },
    
    checkUrl: function(urlInfo, cb) {
      console.log('in m.checkUrl and urlInfo, cb are:');
      console.log(urlInfo);
      console.log(cb);
      cb = cb || function () {};
      
      $.ajax({
        method: "POST",
        data: {e: urlInfo.e, v: urlInfo.v},
        url: host + "php/api/checkUrl.php",
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
      cb(subtotals, categSel, chartData);
    },

    getData: function(dtype, cb) {
      var that = this;
      var userId = user.userId;

      $.ajax({
        method: "GET",
        url: host + "php/api/v1/" + dtype + "/" + userId,
        headers: {Authorization: 'Bearer ' + authToken},
        success: function(result){
          console.log('in getData for user: ' + userId + ' type: ' + dtype + ' and result is: ');
          console.log(result);

          if (dtype === "actual") {
            if (result !== null) {
              act = result;

            } else {

              // If result is null, re-initialize variable
              act = initData();            
            }
          } else if (dtype === "budget") {
            if (result !== null) {
              bud = result;

            } else {

              // If result is null, re-initialize variable
              bud = initData();            
            }
          }
          
          // Update subtotals for current date
          subtotals = that.calcSubtotals();
          chartData = that.calcChartData();
          
          // Pass subtotals & current category to callback
          cb(subtotals, categSel, chartData);
        },
        error: function (xhr, status, error) {
          console.log('Error: ajax call in model.getData returns xhr:');
          console.log(xhr);
          alert('error: the AJAX call in model.getData for php/api/v1/' + dtype + '/' + userId + ' failed.');
        }
      });    
    },
    
    initialize: function (cb) {

      // Get range of dates for selector and initialize 'date' to cur mo & yr
      var date_rg = getDateRg();
      
      // Initialize data arrays to empty
      act = initData();
      bud = initData();

      // Initialize subtotals
      subtotals = this.calcSubtotals();
      chartData = this.calcChartData();

      cb(date_rg, date);
    },
      
    // If login is successful, return user info (userId, name...)
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
        url: host + "php/api/login.php",
        success: function(result){

          // Update variables if login was successful
          if (result.hasOwnProperty('user')) {
            var res = {};
            
            user = result.user;
            categSel = 0;
            authToken = result.authToken;
            
            cb({user, categSel, date, authToken});

          } else {
            console.log("success object did not contain 'user' property");
            cb(result);
          }
        },
        error: function(xhr, status, error) {
          
          console.log(xhr);
          alert('ajax ERROR: ' + status);
        }
      });      
    },
    logout: function() {
      user = {email: '', name: '', e:'', v:'', userId: ''}
      
      // Initialize data arrays to empty
      act = initData();
      bud = initData();
      
      // Re-initialize subtotals
      subtotals = this.calcSubtotals();
      chartData = this.calcChartData();
    },
    requestReset: function(userInfo, cb) {
      var email = userInfo.email;
      
      cb = cb || function () {};
      
      // If email format is OK...
      $.ajax({
        method: "POST",
        data: {email},
        url: host + "php/api/requestReset.php",
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
      var userId = user.userId;
      var dtype = expenseData.dtype;
      
      // Add userId to expenseData obj
      expenseData.userId = userId;

      console.log('in sendExpense and expenseData obj is:');
      console.log(expenseData);
      
      $.ajax({
        method: "POST",
        data: expenseData,
        url: "php/api/v1/" + dtype + "/" + userId,
        headers: {Authorization: 'Bearer ' + authToken},
        success: function(result){
          console.log('success with POSTing expense data and result is:');
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
          console.log('success with setPassword.php and result is:');
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
        url: host + "php/api/signup.php",
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
  };
  return publicAPI;
})();