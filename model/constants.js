/****************************************************
 * Notes on constants.js: 
 *
 * This extends model.js to include model.cat
 * which defines all budget categories & sub-categories
 *
 ****************************************************/

LCB = window.LCB || {};

LCB.model = (function() {
  'use strict';
  
  var CAT = [
    {code: "hous",
     name: "Household",
     sub: [
       {name: "Mortgage/Rent", code: "hous_01"},
       {name: "Maintenance", code: "hous_02"},
       {name: "Home Improvement", code: "hous_03"},
       {name: "Home Insurance", code: "hous_04"},
       {name: "Household Goods", code: "hous_05"},
       {name: "Other", code: "hous_06"}
      ]
    },
    {code: "tran",
     name: "Car/Transit",
     sub: [
       {name: "Car Payment", code: "tran_01"},
       {name: "Transit Fees", code: "tran_02"},
       {name: "Gas", code: "tran_03"},
       {name: "Car Insurance", code: "tran_04"},
       {name: "Car Maintenance", code: "tran_05"},
       {name: "Registration", code: "tran_06"},
       {name: "Other", code: "tran_07"}
      ]
    },
    {code: "food",
     name: "Food",
     sub: [
       {name: "Groceries", code: "food_01"},
       {name: "Fast Food", code: "food_02"},
       {name: "Other", code: "food_03"}
      ]
    },
    {code: "hlth",
     name: "Health",
     sub: [
       {name: "Medical/Dental Insurance", code: "hlth_01"},
       {name: "Disability Insurance", code: "hlth_02"},
       {name: "LTC Insurance", code: "hlth_03"},
       {name: "Co-payments", code: "hlth_04"},
       {name: "Gym Membership", code: "hlth_05"},
       {name: "Prescriptions", code: "hlth_06"},
       {name: "Other", code: "hlth_07"}
      ]
    },
    {code: "util",
     name: "Utilities",
     sub: [
       {name: "Water/Sewer", code: "util_01"},
       {name: "Electricity", code: "util_02"},
       {name: "Natural Gas", code: "util_03"},
       {name: "Cable/Internet", code: "util_04"},
       {name: "Cellphone", code: "util_05"},
       {name: "Garbage/Recyc/Yard Waste", code: "util_06"},
       {name: "Other", code: "util_07"}
      ]
    },
    {code: "pers",
     name: "Clothing/Pers",
     sub: [
       {name: "Clothing", code: "pers_01"},
       {name: "Personal Care", code: "pers_02"},
       {name: "Other", code: "pers_03"}
      ]
    },
    {code: "char",
     name: "Charity",
     sub: [
       {name: "Charity 1", code: "char_01"},
       {name: "Charity 2", code: "char_02"},
       {name: "Charity 3", code: "char_03"},
       {name: "Other", code: "char_04"}
      ]
    },
    {code: "leis",
     name: "Leisure",
     sub: [
       {name: "Restaurants", code: "leis_01"},
       {name: "Local Events", code: "leis_02"},
       {name: "Travel", code: "leis_03"},
       {name: "Other", code: "leis_04"}
      ]
    },
    {code: "taxx",
     name: "Taxes",
     sub: [
       {name: "Federal", code: "taxx_01"},
       {name: "State", code: "taxx_02"},
       {name: "Property", code: "taxx_03"},
       {name: "Other", code: "taxx_04"}
      ]
    },
    {code: "acct",
     name: "Accounts",
     sub: [
       {name: "401K", code: "acct_01"},
       {name: "IRA", code: "acct_02"},
       {name: "Investments", code: "acct_03"},
       {name: "Reserve", code: "acct_04"},
       {name: "Other", code: "acct_05"}
     ]
    },
    {code: "misc",
     name: "Miscellaneous",
     sub: [
       {name: "Other", code: "misc_01"}
      ]
    }
  ];
 
  var publicAPI = _.extend(LCB.model, {
    CAT: CAT
  });
  
  return publicAPI;  
})();