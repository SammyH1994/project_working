/*
 *  Sammy Heutz
 *  10445765
 * 
 *  map.js contains the functions that creates a map with its legend via index.js
**/


// Creates  the initial map
function createMap(nld, data, year, currentProvince, topic, titel, subtitel, pyramidSettings, barSettings){

	var width = 520,
        height = 490;

    var format = d3.format(".3s");

    // Color scale
    var color = d3.scaleLinear()
            .range(["#b5f2d2", "#008545"])
            .domain([375000, 3500000]);

    // Create title for map
    var maptitle = d3.select("#container1")        
        .append("text")
        .attr("id", "titel")
        .style("text-anchor", "middle");

    // Create SVG
   var svg = d3.select("#container1")
        .append("svg")
        .attr("id", "mapsvg")
        .attr("width", "100%")
        .attr("height", "90%");

    // Create subtitle for map
    var mapsubtitle = d3.select("#container1")
        .append("text")
        .attr("id", "subtitle");
        
    // Create projection and path
    var projection = d3.geoMercator();
    var path = d3.geoPath()
        .projection(projection);
    projection.fitSize([width, height], nld);

    // Draw map
    svg.selectAll("path")
        .data(nld.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "grey")
        .attr("stroke-width", "1px")
        .attr("id", function(d) {return d.properties.name;});
        
    // Create legend
    var w = 100, h = 250;

    var key = svg.append("g")
        .attr("id", "legend")
        .attr("width", w)
        .attr("height", h);

    var legend = key.append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#008545")
        .attr("stop-opacity", 1);

    legend
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#b5f2d2")
        .attr("stop-opacity", 1);

    key
        .append("rect")
        .attr("width", 20)
        .attr("height", h)
        .style("fill", "url(#gradient)")
        .style("stroke", "grey")
        .attr("transform", translation(0,10));

    // Create legend axis
    var y = d3.scaleLinear()
        .range([250, 0])
        .domain([375000, 3500000])
        .nice();

    var yAxis = d3.axisRight()
        .scale(y)
        .ticks(10)
        .tickFormat(d3.format(".3s"));

     key
        .append("g")
        .attr("class", "y axis")
        .attr("transform", translation(22,10))
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("axis title");

     // Return settings for update function
    var mapSettings = {
        svg: svg,
        path: path,
        maptitle: maptitle,
        mapsubtitle: mapsubtitle,
        projection: projection,
        format: format,
        color: color,
        currentProvince: currentProvince
        };

    return mapSettings;
}


// Update map
function updateMap(nld, data, year, currentProvince, topic, titel, subtitel, settings){

    // Retrieve settings
    var svg = settings.mapSettings.svg;
    var path = settings.mapSettings.path;
    var mapsubtitle = settings.mapSettings.mapsubtitle;
    var maptitle = settings.mapSettings.maptitle;
    var projection = settings.mapSettings.projection;
    var format = settings.mapSettings.format;
    var color = settings.mapSettings.color;
    var years = settings.years;
    var pyramidSettings = settings.pyramidSettings;
    var barSettings = settings.barSettings;
    var mapSettings = settings.mapSettings;

    // Get data if dropdown is clicked
    $(".dropdown-menu a").click( function() {
        topic = $(this).attr("id");
        var texts = getTopic(topic);
        titel = texts.titel;
        subtitel = texts.subtitel;
    }); 

    // Create map title and subtitle
    maptitle
        .text("Population in the Netherlands in the year " + year);
    mapsubtitle
        .text("Total population: " + format(data["0"].population.total));

    // Create tip
    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(d =>    "<strong>Province:</strong> <span style='color:#b5f2d2'>" 
            + d.properties.name  + 
        "</span></br><strong>Population:</strong> <span style='color:#b5f2d2'>" 
        + format(getPopulation(d.properties.name, data)) + "</span>");

    svg.call(tip);

    // Create pattern that is drawn over color on clicking on map
    var defs = svg.append('svg:defs');

    defs
        .append("svg:pattern")
        .attr("id", "stripes")
        .attr("width", 4)
        .attr("height", 4)
        .attr("patternUnits", "userSpaceOnUse")
        .append('rect')
        .attr('width', 4)
        .attr('height', 4)
        .attr('x', 0)
        .attr('x', 0);

    d3.select('#stripes')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#010101')
        .attr('stroke-width', 0.3)
        .attr("opacity", 0.5);

    // Change color based on data
    svg.selectAll("path")
        .data(nld.features)
        .attr("fill", function(d) {
            population = getPopulation(d.properties.name,data);
            return color(population);
        })
        .on("mousemove",tip.show)
        .on("mouseout", tip.hide)
        .on("click", function(d){

            // Previously clicked map color reset
            svg.select(".filled")
                .style("fill", function(d) {
                if (currentProvince = "Nederland"){
                    currentProvince = "Limburg";
                }
                population = getPopulation(currentProvince, data);
                return color(population);
            })
            .attr("class", currentProvince);

            // Current clicked province gets pattern
            currentProvince = d.properties.name;

            defs.attr("fill", function(d) {
                population = getPopulation(currentProvince, data);
                return color(population);
            });

            svg.select("#" + currentProvince)
                .style("fill", "url(#stripes)")
                .attr("class", "filled");

            // If Limburg is clicked, province is Nederland
            var province = d.properties.name;
            if (province === "Limburg"){
                province = "Nederland";
            };

            provinceDataOne = getProvinceData(data, "Limburg");
            provinceDataTwo = getProvinceData(data, province);
            updatePyramid(provinceDataOne, provinceDataTwo, province, 
                pyramidSettings);
            updateBarchart(provinceDataOne, provinceDataTwo, province, topic, 
                titel, subtitel, barSettings);
        });
}

// Get the population size of a certain province 
function getPopulation(province, data){
    for (var i = 0; i < data.length; i++){
        if (data[i].province == province){
            return data[i].population.total;
        }
    }
}

