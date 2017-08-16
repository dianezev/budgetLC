/*
 * Description: Budget application...
 *
 * Developers: Daniel Clough, Michael Park, Diane Zevenbergen
 * 
 * 
 *
 */

// ---------------INITIALIZE--------------------//

$(document).ready(function() {

  // If url contains hashed email, check if valid and
  // if so prompt user for password creation/reset
  LCB.controller.checkUrl();

  LCB.controller.initialize();
  
  console.log(LCB);

  // Hide worksheets so only start screen displays
  LCB.view.togglePages('#m_home');
  LCB.view.defDate(); // just for user settings - might not need to keep
  LCB.view.userAcct(null);
  
  LCB.view.makeActiveCateg(1, LCB.model.CAT[0].sub);
});
