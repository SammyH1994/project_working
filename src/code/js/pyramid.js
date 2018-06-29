/*
 *  Sammy Heutz
 *  10445765
 * 
 *  pyramid.js contains the functions that create the population pyramid
 *
 * Source:
 *  //https://stackoverflow.com/questions/25044997/creating-population-pyramid-with-d3-js
 *
**/


// Create initial pyramid
function createPyramid(provinceDataOne, provinceDataTwo, provinceTwo){

	var widthPyramid = 450,
    heightPyramid = 280;

    var marginPyramid = { top: 20, left: 20, bottom: 30, right: 20, middle: 28 };

    var format = d3.format(".3s");

	// The width of each side of the chart
	var regionWidth = widthPyramid/2 - marginPyramid.middle;

	// These are the x-coordinates of the y-axes
	var pointA = regionWidth,
	    pointB = widthPyramid - regionWidth;

	// Transform data to correct format for pyramid
	var populationData = [
		{group: "0-5", "Limburg": provinceDataOne.population.from0to4, provinceTwo: provinceDataTwo.population.from0to4},
		{group: "6-10", "Limburg": provinceDataOne.population.from5to10, provinceTwo: provinceDataTwo.population.from5to10},
		{group: "11-15", "Limburg": provinceDataOne.population.from11to15, provinceTwo: provinceDataTwo.population.from11to15},
		{group: "16-20", "Limburg": provinceDataOne.population.from16to20, provinceTwo: provinceDataTwo.population.from16to20},
		{group: "21-25", "Limburg": provinceDataOne.population.from21to25, provinceTwo: provinceDataTwo.population.from21to25},
		{group: "26-30", "Limburg": provinceDataOne.population.from26to30, provinceTwo: provinceDataTwo.population.from26to30},
		{group: "31-35", "Limburg": provinceDataOne.population.from31to35, provinceTwo: provinceDataTwo.population.from31to35},
		{group: "36-40", "Limburg": provinceDataOne.population.from36to40, provinceTwo: provinceDataTwo.population.from36to40},
		{group: "41-45", "Limburg": provinceDataOne.population.from41to45, provinceTwo: provinceDataTwo.population.from41to45},
		{group: "45-50", "Limburg": provinceDataOne.population.from46to50, provinceTwo: provinceDataTwo.population.from46to50},
		{group: "51-55", "Limburg": provinceDataOne.population.from51to55, provinceTwo: provinceDataTwo.population.from51to55},
		{group: "56-60", "Limburg": provinceDataOne.population.from56to60, provinceTwo: provinceDataTwo.population.from56to60},
		{group: "61-65", "Limburg": provinceDataOne.population.from61to65, provinceTwo: provinceDataTwo.population.from61to65},
		{group: "66-70", "Limburg": provinceDataOne.population.from66to70, provinceTwo: provinceDataTwo.population.from66to70},
		{group: "71-75", "Limburg": provinceDataOne.population.from71to75, provinceTwo: provinceDataTwo.population.from71to75},
		{group: "76-80", "Limburg": provinceDataOne.population.from76to80, provinceTwo: provinceDataTwo.population.from76to80},
		{group: "81-85", "Limburg": provinceDataOne.population.from81to85, provinceTwo: provinceDataTwo.population.from81to85},
		{group: "86-90", "Limburg": provinceDataOne.population.from86to90, provinceTwo: provinceDataTwo.population.from86to90},
		{group: "91-94", "Limburg": provinceDataOne.population.from91to94, provinceTwo: provinceDataTwo.population.from91to94},
		{group: "95+", "Limburg": provinceDataOne.population.from95, provinceTwo: provinceDataTwo.population.from95}
	];

	// Parse amount so that d3.max works
	populationData.forEach(function(d) {
		d["Limburg"] = parseFloat(d["Limburg"]).toFixed(2),
		d.provinceTwo = parseFloat(d.provinceTwo).toFixed(2);
	});

	    // Create title
    var titleSvg = d3.select("#container2")
        .append('svg')
        .attr("width", widthPyramid)
        .attr("height", 60)
        .append('g');

    var title = titleSvg
        .append('g')
        .attr('id', 'title');

    var pyramidTitle = titleSvg        
        .append("text")
        .attr("id", "title")
        .style("text-anchor", "middle")
        .style("font-size", "15px")
        .style("fill", "grey")
        .style("font-size", "20px")
        .style("text-anchor", "middle")
        .attr("x", widthPyramid / 2)
        .attr("y", 30)
       	.text("Population by age group");

	// Create SVG
	var svg = d3.select('#container2').append('svg')
		.attr('width', marginPyramid.left + widthPyramid + marginPyramid.right)
		.attr('height', marginPyramid.top + heightPyramid + marginPyramid.bottom)
		// Add a group for space between pyramids
		.append('g')
		.attr('transform', translation(marginPyramid.left, marginPyramid.top))
		.attr("id", "space");

 	// Create text below graph
    var leftProvince = d3.select("#container2")
        .append("text")
        .attr("id", "leftProvince")
        .text("Limburg, total population: " + format(provinceDataOne.population.total))
        .style("font-size", "12px");

    var rightProvince = d3.select("#container2")
    	.append("text")
    	.attr("id", "rightProvince")
    	.text(provinceTwo + ", total population: " + format(provinceDataTwo.population.total))
    	.style("font-size","12px");

   	// Create tooltips
    var tipLeft = d3.tip()
		.attr("class", "d3-tip")
		.offset([-8, 0])
		.html(function(d) {					return "<strong>Age Group:</strong> <span style='color:#b5f2d2'>" + d.group + 
					"</span></br><strong>Percentage:</strong> <span style='color:#b5f2d2'>" + d["Limburg"] + "</span>";});

   	var tipRight = d3.tip()
		.attr("class", "d3-tip")
		.offset([-8, 0])
		.html(function(d) {					return "<strong>Age Group:</strong> <span style='color:#b5f2d2'>" + d.group + 
					"</span></br><strong>Percentage:</strong> <span style='color:#b5f2d2'>" + d.provinceTwo + "</span>";})

	svg.call(tipLeft);
	svg.call(tipRight);

	// Max value for X scales
	var maxValue = Math.max(
		d3.max(populationData, function(d) { return d["Limburg"]; }),
		d3.max(populationData, function(d) { return d.provinceTwo; })
	);

	// Create the scales
	var xScale = d3.scaleLinear()
		.domain([0, maxValue])
		.range([0, regionWidth])
		.nice();

	var xScaleLeft = d3.scaleLinear()
		.domain([0, maxValue])
		.range([regionWidth, 0]);

	var xScaleRight = d3.scaleLinear()
		.domain([0, maxValue])
		.range([0, regionWidth]);

	var yScale = d3.scaleBand()
		.domain(populationData.map(function(d) { return d.group; }))
		.rangeRound([heightPyramid, 0])
		.padding(0.1);

	// Set up the Axes
	var yAxisLeft = d3.axisRight()
		.scale(yScale)
		.tickSize(4,0)
		.tickPadding(marginPyramid.middle-4);

	var yAxisRight = d3.axisLeft()
		.scale(yScale)
		.tickSize(4,0)
		.tickFormat('');

	var xAxisRight = d3.axisBottom()
		.scale(xScale)
		.tickFormat(function(d){ return d + "%"});

	var xAxisLeft = d3.axisBottom()
		.scale(xScale.copy().range([pointA, 0]))
		.tickFormat(function(d){ return d + "%"});

	// Make groups for each side of the pyramid
	// Scale(-1,1) is used to reverse the left side so the bars grow left instead of right
	var leftBarGroup = svg.append('g')
		.attr('transform', translation(pointA, 0) + 'scale(-1,1)');
	var rightBarGroup = svg.append('g')
		.attr('transform', translation(pointB, 0));

	// Draw the axes
	svg
		.append('g')
		.attr('class', 'axis y left')
		.attr('transform', translation(pointA, 0))
		.call(yAxisLeft)
		.selectAll('text')
		.attr("id", "yAxis")
		.style('text-anchor', 'middle');

	svg
		.append('g')
		.attr('class', 'axis y right')
		.attr('transform', translation(pointB, 0))
		.call(yAxisRight);

	svg
		.append('g')
		.attr('class', 'axis x left')
		.attr('transform', translation(0, heightPyramid))
		.call(xAxisLeft);

	svg
		.append('g')
		.attr('class', 'axis x right')
		.attr('transform', translation(pointB, heightPyramid))
		.call(xAxisRight);

	// Draw the bars
	var leftBars = leftBarGroup.selectAll('.bar.left')
		.data(populationData)
		.enter()
		.append('rect');

  	leftBars
		.transition()
		.delay(1000)
		.duration(800)
		.attr('class', 'bar left')
		.attr('x', 0)
		.attr('y', function(d) { return yScale(d.group); })
		.attr('width', function(d) { return xScale(d["Limburg"]); })
		.attr('height', yScale.bandwidth());

    leftBars
	    .on("mouseover", tipLeft.show)
		.on("mouseout", tipLeft.hide);	

	var rightBars = rightBarGroup.selectAll('.bar.right')
		.data(populationData)
		.enter().append('rect');

 	rightBars
		.transition()
		.delay(1000)
		.duration(800)
		.attr('class', 'bar right')
		.attr('x', 0)
		.attr('y', function(d) { return yScale(d.group); })
		.attr('width', function(d) { return xScale(d.provinceTwo); })
		.attr('height', yScale.bandwidth());

    rightBars
	    .on("mouseover", tipRight.show)
		.on("mouseout", tipRight.hide);	

	// Return pyramid settings for update
	var pyramidSettings = {
		widthPyramid: widthPyramid,
		heightPyramid: heightPyramid,
		leftBars: leftBars,
		rightBars: rightBars,
		yScale: yScale,
		xScale: xScale,
		populationData: populationData,
		rightProvince: rightProvince,
		format: format
	};

	return pyramidSettings;
}


// Update the pyramid on data change
function updatePyramid(provinceDataOne, provinceDataTwo, provinceTwo, settings){

	// Pyramid settings
	var widthPyramid = settings.widthPyramid;
	var heightPyramid = settings.heightPyramid;
	var leftBars = settings.leftBars;
	var rightBars = settings.rightBars;
	var yScale = settings.yScale;
	var xScale = settings.xScale;
	var populationData = settings.populationData;
	var rightProvince = settings.rightProvince;
	var format = settings.format;

	var ageGroups = ["from0to4", "from5to10", "from11to15", "from16to20", 
	"from21to25", "from26to30", "from31to35", "from36to40", "from41to45", 
	"from46to50", "from51to55", "from56to60", "from61to65",
	"from66to70", "from71to75", "from76to80", "from81to85", "from86to90", 
	"from91to94", "from95"];

	for (var i = 0; i < populationData.length; i ++){
		populationData[i]["Limburg"] = provinceDataOne["population"][ageGroups[i]];
		populationData[i].provinceTwo = provinceDataTwo["population"][ageGroups[i]];
	}

	// Parse amount so that d3.max works
	populationData.forEach(function(d) {
		d["Limburg"] = parseFloat(d["Limburg"]).toFixed(2);
		d.provinceTwo = parseFloat(d.provinceTwo).toFixed(2);
	});

	// Max values for Axes
	var maxValue = Math.max(
	  d3.max(populationData, function(d) { return d["Limburg"]; }),
	  d3.max(populationData, function(d) { return d.provinceTwo; })
	);

	// Update the bars
  	leftBars
  		.data(populationData);

	leftBars
		.exit()
      	.attr("y", yScale(0))
       	.attr("x", widthPyramid)
    	.attr("height", heightPyramid - yScale(0))
      	.style("fill-opacity", 0.7)
		.remove();

	leftBars
		.enter()
		.append("rect");

	leftBars
  		.transition()
  		.delay(1000)
      	.duration(800)
	    .attr('class', 'bar left')
    	.attr('x', 0)
	    .attr('y', function(d) { return yScale(d.group); })
 	  	.attr('width', function(d) { return xScale(d["Limburg"]); })
    	.attr('height', yScale.bandwidth());
		
    rightBars
    	.data(populationData);

	rightBars
		.exit()
      	.attr("y", yScale(0))
       	.attr("x", widthPyramid)
    	.attr("height", heightPyramid - yScale(0))
      	.style("fill-opacity", 0.7)
		.remove();

	rightBars
		.enter()
		.append("rect");

	rightBars
  		.transition()
  		.delay(1000)
  		.duration(800)
	    .attr('class', 'bar right')
	    .attr('x', 0)
	    .attr('y', function(d) { return yScale(d.group); })
	    .attr('width', function(d) { return xScale(d.provinceTwo); })
	    .attr('height', yScale.bandwidth());

	// Change right province text
    rightProvince
    	.text(provinceTwo + ", total population: " + 
    		format(provinceDataTwo.population.total));
}

