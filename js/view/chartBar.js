/****************************************************
 * Notes on chartBar.js: 
 *
 * This extends view.js to include view.chartBar
 * which is used to create grouped bar chart
 *
 * this chart adapted from https://bl.ocks.org/mbostock/3887051
 ****************************************************/

LCB = window.LCB || {};

LCB.view = (function() {
  'use strict';
  // TBD: pass in "svg" for sel, or figure out if ids will work...
  var chartBar = function(sel, subtotals) {
    
    var svg = d3.select(sel);
    svg.selectAll("*").remove();
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

    var x1 = d3.scaleBand()
            .padding(0.05);

    var y = d3.scaleLinear()
            .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
            .range(["#3b6fb7", "#be4868"]);
    
    var keys = ["Budget", "Actual"];

    var data = [];

    // Build data array needed for chart
    for (var i = 0, l = subtotals.length; i < l; i++) {
      data[i] = {};
      data[i].Budget = +subtotals[i].budget.amt; 
      data[i].Actual = +subtotals[i].actual.amt;
      data[i].Categ = subtotals[i].budget.name;
    }
    /***********************
     * for local testing only:
     ************************/
//    var testData = d3.csv("testChart.csv", function(d, i, columns) {
//      for (var j = 1, n = columns.length; j < n; ++j) {
//        console.log('j INSIDE FOR LOOP is ' + j);
//        console.log('columns[j] is ' + columns[j]);
//        console.log('d[columns[j]] is ' + d[columns[j]]);
//        d[columns[j]] = +d[columns[j]]; 
//      }
//
//      return d;   //returns one object for array, ie {Actual:123, Budget: 456, Categ: "household"}
//    });
//    console.log(testData);
//    data = testData;
//    
    /***********************
     * end testing
     ************************/
    

    x0.domain(data.map(function(d) { return d.Categ; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) {
      return d3.max(keys, function(key) {
        return d[key]; 
      }); 
    })]).nice();

    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d) { 
        return "translate(" + x0(d.Categ) + ",0)";
      })
      .selectAll("rect")
      .data(function(d) { 
        return keys.map(function(key) { 
          return {key: key, value: d[key]};
        });
      })
      .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })  
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Dollars");

    var legend = g.append("g")
                .attr("font-family", "Raleway")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function(d, i) {
                  return "translate(0," + i * 20 + ")";
                });

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

    // TBD adapt this sample code to add data labels
      // Select, append to SVG, and add attributes to text
    //svg.selectAll("text")
    //    .data(dataArray)
    //    .enter().append("text")
    //    .text(function(d) {return d})
    //           .attr("class", "text")
    //           .attr("x", function(d, i) {return (i * 60) + 36})
    //           .attr("y", function(d, i) {return 415 - (d * 10)});


  };
 
  var publicAPI = _.extend(LCB.view, {
    chartBar: chartBar
  });
  
  return publicAPI;  
})();