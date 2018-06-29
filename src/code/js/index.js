/*
 *  Sammy Heutz
 *  10445765
 * 
 *  index.js is the main script that creates all visualizations on the visualizations page.
 *
 * Sources:
 * //https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
 * //https://www.w3schools.com/howto/howto_css_modals.asp
 * //https://api.jquery.com/scroll/
**/


window.onload = function() {

	var currentProvince = "Nederland";
	var topic = "income";
	var titel = "Yearly income";
	var subtitel = "x 1000 euro";
	var year = "2006";
	
	// Retrieve data
	var data2006 = "../../data/data_2006.json";
	var data2007 = "../../data/data_2007.json";
	var data2008 = "../../data/data_2008.json";
	var data2009 = "../../data/data_2009.json";
	var data2010 = "../../data/data_2010.json";
	var data2011 = "../../data/data_2011.json";
	var data2012 = "../../data/data_2012.json";
	var data2013 = "../../data/data_2013.json";
	var data2014 = "../../data/data_2014.json";
	var data2015 = "../../data/data_2015.json";
	var nld = "../../data/nld.json";

	d3.queue()
		.defer(d3.json, data2006)
		.defer(d3.json, data2007)
		.defer(d3.json, data2008)
		.defer(d3.json, data2009)
		.defer(d3.json, data2010)
		.defer(d3.json, data2011)
		.defer(d3.json, data2012)
		.defer(d3.json, data2013)
		.defer(d3.json, data2014)
		.defer(d3.json, data2015)
		.defer(d3.json, nld)
		.await(callback);
	
	function callback(error, data2006, data2007, data2008, data2009, data2010, data2011, data2012, data2013, data2014, data2015, nld) {
		if (error) throw error;

		// Create object with data per year
	  	var years = {
	  		"2006" : data2006.data_2006,
	  		"2007" : data2007.data_2007,
	  		"2008" : data2008.data_2008,
	  		"2009" : data2009.data_2009,
	  		"2010" : data2010.data_2010,
	  		"2011" : data2011.data_2011,
	  		"2012" : data2012.data_2012,
	  		"2013" : data2013.data_2013,
	  		"2014" : data2014.data_2014,
	  		"2015" : data2015.data_2015,
	  	}

	  	// Change values causes of death, education and social security
	  	for (var key in years){
	  		changeDataValues(years[key]);
	  	}

	  	// Initial data per province
	  	var provinceDataOne = getProvinceData(years[year], "Limburg");
		var provinceDataTwo = getProvinceData(years[year], currentProvince);

	  	// Create initial visualizations
		var pyramidSettings = createPyramid(provinceDataOne, provinceDataTwo, currentProvince);
		var barSettings = createBarchart();
		var mapSettings = createMap(nld, years[year], year, currentProvince, topic, titel, subtitel);

		var settings = {
			nld: nld,
			years : years,
			pyramidSettings: pyramidSettings,
			barSettings: barSettings,
			mapSettings: mapSettings,
			topic: topic,
		};

		updateMap(nld, years[year], year, currentProvince, topic, titel, subtitel, settings);
		updatePyramid(provinceDataOne, provinceDataTwo, currentProvince, pyramidSettings);
		updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, titel, subtitel, barSettings);

		// Create slider
	  	var sliderData = d3.range(0, 10).map(function (d) { 
	  		return new Date(2006 + d, 10, 3); 
	  	});

		var slider = d3.sliderHorizontal()
		    .min(d3.min(sliderData))
		    .max(d3.max(sliderData))
		    .step(1000 * 60 * 60 * 24 * 365)
		    .width(400)
		    .tickFormat(d3.timeFormat('%Y'))
		    .tickValues(sliderData)
		    .on('onchange', val => {
		    	var sliderValue = d3.select(".parameter-value").text()

		      	changeYear(sliderValue, currentProvince, settings, topic, titel, subtitel);
		    });

	  	var g = d3.select("div#slider").append("svg")
		    .attr("width", 500)
		    .attr("height", 100)
		    .append("g")
		    .attr("transform", "translate(30,30)")
		    .style('fill', "#fbb4ae");

	  	g.call(slider);

		// Change barchart when topic is chosen
		function changeTopic(){
			year = d3.select(".parameter-value").text();
			topic = this.getAttribute("id");

			// Get correct title and subtitle
			var texts = getTopic(topic);
			var titel = texts.titel;
			var subtitel = texts.subtitel;

			// Get current chosen province
			currentProvince = getChosenProvince(currentProvince);

			// Get correct data and update chart
			var data = years[year];
			provinceDataOne = getProvinceData(data, "Limburg");
			provinceDataTwo = getProvinceData(data, currentProvince);
			updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, titel, subtitel, barSettings);	
		}

		// Call changeTopic when dropdown item is chosen
		document.getElementById("birthsanddeaths").onclick=changeTopic;
		document.getElementById("causesofdeath").onclick=changeTopic;
		document.getElementById("income").onclick=changeTopic;
		document.getElementById("socialsecurity").onclick=changeTopic;
		document.getElementById("education").onclick=changeTopic;
		document.getElementById("migration").onclick=changeTopic;

		// Scroll functions
		$("#scrollUp").click(function() {
		    $('html, body').animate({
		        scrollTop: $("#container1").offset().top
		    }, 1000);
		});

		$("#scrollDown").click(function() {
		    $('html, body').animate({
		        scrollTop: $("#container1").offset().top
		    }, 1000);
		});

		$("path").click(function() {
		    $('html, body').animate({
		        scrollTop: $("#slidercol").offset().top
		    }, 1000);
		});

	// Info button with pop up screen
	var modal = document.getElementById('myModal');
	var btn = document.getElementById("infoButton");
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
    		}
		}
	}
}



