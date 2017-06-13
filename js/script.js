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

  // call any LCB.view or LCB.model methods needed to initialize...
  
  // Hide worksheets so only start screen displays
  LCB.view.togglePages('#m_home');
  LCB.view.defDate();
  LCB.view.userAcct(null);
  
});
