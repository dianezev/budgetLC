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
  
  
  // temp, for pie chart testing
var salesData=[
	{label:"Basic", color:"#3366CC"},
	{label:"Plus", color:"#DC3912"},
	{label:"Lite", color:"#FF9900"},
	{label:"Elite", color:"#109618"},
	{label:"Delux", color:"#990099"}
];

var svg = d3.select(".cPie").append("svg").attr("width",700).attr("height",300);

svg.append("g").attr("id","salesDonut");
svg.append("g").attr("id","quotesDonut");
LCB.view.Donut3D.draw("salesDonut", LCB.view.randomData(), 150, 150, 130, 100, 30, 0.4);
LCB.view.Donut3D.draw("quotesDonut", LCB.view.randomData(), 450, 150, 130, 100, 30, 0);

  
});
