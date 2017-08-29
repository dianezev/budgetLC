/****************************************************
 * Notes on chartPie.js: 
 *
 * This extends view.js to include view.donut3D
 * which is used to create pie chart
 *
 * this chart adapted from http://bl.ocks.org/NPashaP/9994181
 ****************************************************/

LCB = window.LCB || {};

LCB.view = (function() {
  'use strict';

	var donut3D={};
    var xCenter1;
    var y;
    var rx;
    var ry;
    var h;
    var gapSize;

    function setDimensions(availWidth) {
        if (availWidth >= 700 ) {
          xCenter1 = 150;
          
        } else {
          xCenter1 = Math.floor(availWidth / 5);
        }
        y = xCenter1;
        rx = Math.floor(xCenter1 * .9);
        ry = Math.floor(xCenter1 * 2/3);
        h = Math.floor(xCenter1 / 5);
        gapSize = xCenter1;
    }
  
	function pieTop(d, rx, ry, ir ){
		if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
		var sx = rx*Math.cos(d.startAngle),
			sy = ry*Math.sin(d.startAngle),
			ex = rx*Math.cos(d.endAngle),
			ey = ry*Math.sin(d.endAngle);
			
		var ret =[];
		ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
		ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
		return ret.join(" ");
	}

	function pieOuter(d, rx, ry, h ){
		var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
		
		var sx = rx*Math.cos(startAngle),
			sy = ry*Math.sin(startAngle),
			ex = rx*Math.cos(endAngle),
			ey = ry*Math.sin(endAngle);
			
			var ret =[];
			ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
			return ret.join(" ");
	}

	function pieInner(d, rx, ry, h, ir ){
		var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
		
		var sx = ir*rx*Math.cos(startAngle),
			sy = ir*ry*Math.sin(startAngle),
			ex = ir*rx*Math.cos(endAngle),
			ey = ir*ry*Math.sin(endAngle);

			var ret =[];
			ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
			return ret.join(" ");
	}

	function getPercent(d){
		return (d.endAngle-d.startAngle > 0.2 ? 
				Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
	}	
	
	donut3D.transition = function(id, data, ir){
      
      function arcTweenInner(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
      }
      function arcTweenTop(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return pieTop(i(t), rx, ry, ir);  };
      }
      function arcTweenOuter(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
      }
      function textTweenX(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return 0.6*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
      }
      function textTweenY(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return 0.6*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
      }

      var _data = d3.pie().sort(null).value(function(d) {return d.value;})(data);

      d3.select("#"+id).selectAll(".innerSlice").data(_data)
          .transition().duration(750).attrTween("d", arcTweenInner); 

      d3.select("#"+id).selectAll(".topSlice").data(_data)
          .transition().duration(750).attrTween("d", arcTweenTop); 

      d3.select("#"+id).selectAll(".outerSlice").data(_data)
          .transition().duration(750).attrTween("d", arcTweenOuter); 	

      d3.select("#"+id).selectAll(".percent").data(_data).transition().duration(750)
          .attrTween("x",textTweenX).attrTween("y",textTweenY).text(getPercent); 	
	}
	
	donut3D.draw=function(id, data, availWidth, pieCtr, ir, COLORS){
        setDimensions(availWidth);
        var x = (xCenter1 * pieCtr) + (gapSize * (pieCtr - 1));
        var _data = d3.pie().sort(null).value(function(d) {return d.value;})(data);
        var type = id[0].toUpperCase() + id.slice(1,6);
      
		var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
			.attr("class", "slices");
		
        var tooltip = d3.select("body").append("div").attr("class", "toolTip");
      
        var z = d3.scaleOrdinal()
            .range(COLORS);
        var keys = data.map(e => e.label);
        var margin = {top: 20, right: 20, bottom: 30, left: 40};
        var width = +d3.select("#"+id).attr("width") - margin.left - margin.right;

      
      
		slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
			.attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
			.each(function(d){this._current=d;});
		
		slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
			.style("fill", function(d) { return d.data.color; })
			.style("stroke", function(d) { return d.data.color; })
			.attr("d",function(d){ return pieTop(d, rx, ry, ir);})
            .on("mousemove", function(d){
                  tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html(type + "<br>" + (d.data.label) + "<br>" + "$" + (d.data.value));
                })
            .on("mouseout", function(d){ tooltip.style("display", "none");})
			.each(function(d){this._current=d;});
		
		slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
			.attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
			.each(function(d){this._current=d;});

		slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
			.attr("x",function(d){ return 0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
			.attr("y",function(d){ return 0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
			.text(getPercent).each(function(d){this._current=d;});		
      
        slices.append("g")
                    .attr("font-family", "Raleway")
                    .attr("font-size", 20)
                    .attr("text-anchor", "middle")
                    .append("text")
        //          .attr("x", width - 24)
                  //.attr("x", width + 20)
                    .attr("y", 150)
                  //.attr("dy", "0.32em")
                    .text(type);

      
        // Legend for first pie only
        if (pieCtr === 1) {
//        var legend = slices.append("g")
        var legend = d3.select("#legend").append("g")
                    .attr("class", "legend")
                    .attr("font-family", "Raleway")
                    .attr("font-size", 10)
                    .attr("text-anchor", "end")
                    .selectAll("g")
                    .data(keys.slice())
                    .enter().append("g")
                    .attr("transform", function(d, i) {
                      return "translate(730," + (i * 20 + 50) + ")";
                    });

        legend.append("rect")
//          .attr("x", width - 19)
          .attr("x", width + 25)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", z);

        legend.append("text")
//          .attr("x", width - 24)
          .attr("x", width + 20)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(function(d) { return d; });
        }

	}
	
  var publicAPI = _.extend(LCB.view, {
    donut3D: donut3D
  });
  
  return publicAPI;  
})();
