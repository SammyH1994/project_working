/*
 *  Sammy Heutz
 *  10445765
 * 
 *  barchart.js contains the functions that create the barchart
 *
 * Sources:
 *  //https://codepen.io/Rastikko/pen/GqNbqM
 *  //https://jsfiddle.net/mrl513/arjcq9ka/
 *  //https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad
**/


// Create initial barchart settings
function createBarchart(){

    var marginBar = {top: 20, right: 100, bottom: 30, left: 30},
        widthBar = 420 - marginBar.left - marginBar.right,
        heightBar = 340 - marginBar.top - marginBar.bottom;

    // Set scales
    var x0 = d3.scaleBand()
        .rangeRound([0, widthBar])
        .padding(0.1);

    var x1 = d3.scaleBand();

    var y = d3.scaleLinear()
	     .range([heightBar, 0]);

    // Colors (colorbrewer)
    var colorScheme =  ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6"];
    var color = d3.scaleOrdinal()
        .range(colorScheme);
    
    // Create title
    var titleSvg = d3.select("#container3")
        .append('svg')
        .attr("width", widthBar)
        .attr("height", 60)
        .append('g');

    var title = titleSvg
        .append('g')
        .attr('id', 'title');

    title
        .append('text')
        .attr("id", "bartitel")
        .style("font-size", "15px")
        .style("fill", "grey")
        .style("font-size", "20px")
        .style("text-anchor", "middle")
        .attr("x", widthBar / 2)
        .attr("y", 30);

    title
        .append('text')
        .attr("id", "barsubtitel")
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .attr('y', 50)
        .attr("x", widthBar / 2);

    //Create SVG
    svg = d3.select("#container3").append("svg")
        .attr("width", widthBar + marginBar.left + marginBar.right)
        .attr("height", heightBar + marginBar.top + marginBar.bottom)
        .append("g")
        .attr("transform", translation(marginBar.left, marginBar.top));

    // Create axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", translation(0, heightBar));

    svg
        .append("g")
        .attr("class", "y axis")
        .style('opacity','0');

    // Create text for y Axis
    var yText = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "10px");

    // Return bar settings for update function
    var barSettings = {
        marginBar : marginBar,
        heightBar: heightBar,
        widthBar: widthBar,
        svg: svg,
        x0 : x0,
        x1: x1,
        y: y,
        color: color,
        title: title,
        yText: yText,
    };

    return barSettings;
}


// Update bar chart
function updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, bartitel, barsubtitel, settings){

    // Retrieve settings
    var marginBar = settings.marginBar;
    var heightBar = settings.heightBar;
    var widthBar = settings.widthBar;
    var svg = settings.svg;
    var x0 = settings.x0;
    var x1 = settings.x1;
    var y = settings.y;
    var color = settings.color;
    var title = settings.title;
    var yText = settings.yText;

    var barData = [provinceDataOne, provinceDataTwo];

    // Check data for empty values
    var keys = Object.keys(barData[0][topic]);
    var emptyValues = 0;

    for (var i = 0; i < barData.length; i++){
          var dates = barData[i][topic];
          for (var j = 0; j < Object.keys(barData[0][topic]).length; j++){
              if (dates[keys[j]] === "0.00"){
                  emptyValues = 1;
              }
          }
      }

    // Display alert if empty values are present
    if (emptyValues === 1){
      document.getElementById("nodata").style.display =  "block";
    }

    // Update chart
    else {

        document.getElementById("nodata").style.display =  "none";

        // Change title and subtitle
        title.selectAll("#bartitel")
            .text(bartitel);
        title.selectAll("#barsubtitel")
            .text(barsubtitel);

        var categoriesNames = barData.map(function(d) { return d.province; });
        var rateNames = Object.keys(barData[0][topic]);

        // Change data to correct format
        barData.forEach(function(d) {
            d.values = rateNames.map(function(name) { 
                return {name: name, value: parseFloat(d[topic][name])}; 
            });
        });

        // Update scales and call axes
        x0
            .domain(categoriesNames);

        x1
            .domain(rateNames)
            .range([0, x0.bandwidth()]);

        var xAxis = d3.axisBottom()
            .scale(x0);

        svg.select(".x")
            .call(xAxis);

        y.domain([0, d3.max(barData, function(d) {return d3.max(d.values, function(d) {
            return d.value;
        }); })])
            .nice();

        var yAxis = d3.axisLeft()
            .scale(y);

        svg.select('.y')
            .transition()
            .duration(500)
            .style('opacity','1')
            .call(yAxis);

        // Create tip
        var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-8, 0])
            .html(d =>   "<strong>Value:</strong> <span style='color:#b5f2d2'>" 
                + d.value  + "</span>");

        // Create two groups for the bars
        var slice = svg.selectAll(".slice")
            .data(barData);

        slice
            .enter()
            .append("g")
            .attr("class", "slice")
            .attr("transform", function(d) { 
                return translation(x0(d.province),0); 
            });


        // Create the bars that will be placed in each group
        var bars = d3.selectAll(".slice").selectAll("rect")
            .data(function(d) { return d.values; });

        bars
            .enter()
            .append("rect")
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .attr("class", "bar")
            .transition()
            .delay(1000) 
            .duration(800)
            .attr("width", x1.bandwidth())
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("value", function(d){return d.name;})
            .attr("height", function(d) { return heightBar - y(d.value); })
            .style("fill", function(d,i) { return color(i); });

        bars
            .transition()
            .delay(1000)
            .duration(800)
            .attr("x", function(d){return x1(d.name)})
            .attr("width", x1.bandwidth())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return heightBar - y(d.value); })
            .style("fill", function(d,i) { return color(i); });

        bars
            .exit()
            .remove();

        svg.call(tip);

        // Create text for y Axis
        yText
            .text(barsubtitel);

        svg.selectAll(".legend")
            .remove();

        // Create legend holder
        var legendHolder = svg.append('g')
            // Translate the holder to the right side of the graph
            .attr('transform', translation(marginBar.left + widthBar, 0));

        // Create legend
        var legend = legendHolder.selectAll(".legend")
            .data(rateNames.slice())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return  translation(0, i * 20); });

        legend
            .append("rect")
            .attr("x", 0)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d,i) { return color(i)});

        legend
            .append("text")
            .attr("x", 0)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });
  }
}