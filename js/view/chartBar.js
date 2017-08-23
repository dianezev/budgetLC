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

  var chartBar = function(sel, data) {
    var availWidth = this.availWidth;
    var availHeight = availWidth / 2.16;
    var top = availWidth * .02;
    var right = availWidth * .02;
    var bottom = availWidth * .03;
    var left = availWidth * .04;
    
    var svg = d3.select(sel);
    
    svg.selectAll("*").remove();
    var margin = {top: top, right: right, bottom: bottom, left: left};
    var width = availWidth - margin.left - margin.right;
    var height = availHeight - margin.top - margin.bottom;

    // TBD Experimenting with tooltips
    // see for more info: https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

    var x1 = d3.scaleBand()
            .padding(0.05);

    var y = d3.scaleLinear()
            .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
            .range(["#009688", "#3f51b5"]);
    
    var keys = ["Budget", "Actual"];

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
      .attr("fill", function(d) { return z(d.key); })
      .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.key) + "<br>" + "$" + (d.value));
          })
      .on("mouseout", function(d){ tooltip.style("display", "none");});
    

    g.append("g")
      .style("font", "12px Raleway")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

    g.append("g")
      .style("font", "9px Raleway")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null))
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
                .data(keys.slice())
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

  };
 
  var publicAPI = _.extend(LCB.view, {
    chartBar: chartBar
  });
  
  return publicAPI;  
})();