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
    
    var svg = d3.select(sel),
              margin = {top: 20, right: 20, bottom: 30, left: 40},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom,
              g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

    var x1 = d3.scaleBand()
            .padding(0.05);

    var y = d3.scaleLinear()
            .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6"]);
    
    var keys = ["Budget", "Actual"];

    var data = [];

    // Build data array needed for chart
    for (var i = 0, l = subtotals.length; i < l; i++) {
      data[i] = {};
      data[i].Budget = +subtotals[i].budget.amt; 
      data[i].Actual = +subtotals[i].actual.amt;
      data[i].Categ = subtotals[i].budget.name;
    }

//    d3.csv("js/charts/testChart.csv", function(d, i, columns) {
//        // 'columns' is array of property names [categ, budget, actual]
//
//        // loop gets & returns each prop in an object 'd' {actual:213, budget: 456, categ: "blah"}
//        for (var j = 1, n = columns.length; j < n; ++j) {
//          console.log('j INSIDE FOR LOOP is ' + j);
//          console.log('columns[j] is ' + columns[j]);
//          console.log('d[columns[j]] is ' + d[columns[j]]);
//          d[columns[j]] = +d[columns[j]]; //DMZ question - what does this do? seems to only affect max value on y axis
//        }
//        console.log('finished with loop and d is:');
//        console.log(d);
//        return d;   //returns one object for array, ie {Actual:123, Budget: 456, Categ: "household"}
//      }, function(error, data) {
//        // 'data' is array of objects from 1st cb - 1 for each categ - [{actual:213, budget: 456, categ: "blah"},...]
//
//        if (error) throw error;
//        console.log('1st cb complete and data is:');
        console.log(data);

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
          .text("Population");

        var legend = g.append("g")
                    .attr("font-family", "sans-serif")
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
          .text(function(d) { console.log("in legend.append('text'), returning d:"); console.log(d);return d; });

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