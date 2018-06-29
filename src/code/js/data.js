/*
 *  Sammy Heutz
 *  10445765
 * 
 *  data.js contains helper functions for the visualizations.
**/


// Retrieve the data for a specific province
function getProvinceData(data, province){

	for (var i = 0; i < data.length; i++){
		if (data[i].province === province){
				return data[i];
			}
		}
	}


// Change values for causes of death, education and social security to be per 1000 people for better comparison
function changeDataValues(data){

	var topics = ["causesofdeath", "education", "socialsecurity"];

	for (var i = 0; i < data.length; i++){

		// Get population count per province
		population = data[i].population.total;

		for (var j = 0; j < topics.length; j++){

			// Get subtopic
			var subtopics = data[i][topics[j]];

			for (var key in subtopics){

				// Calculate ratio per 1000 people for each subtopic
				subtopics[key] = parseFloat(subtopics[key]/population*1000).toFixed(2);
			}
		}
	}
}

// Change visualizations when year is changed
function changeYear(year, currentProvince, settings, topic, titel, subtitel){

	// Get current chosen province
	currentProvince = getChosenProvince(currentProvince);
	var texts = getTopic(topic);
	titel = texts.titel;
	subtitel = texts.subtitel;

	var nld = settings.nld;
	var years = settings.years;
	var pyramidSettings = settings.pyramidSettings;
	var barSettings = settings.barSettings;
	var mapSettings = settings.mapSettings;
  	var data = years[year];

  	// Update visualizations
  	provinceDataOne = getProvinceData(data, "Limburg");
  	provinceDataTwo = getProvinceData(data, currentProvince);
  	updatePyramid(provinceDataOne, provinceDataTwo, currentProvince, pyramidSettings);
  	updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, titel, subtitel, barSettings);
  	updateMap(nld, data, year, currentProvince, topic, titel, subtitel, settings);

}


// Retrieve the titles and subtitles belonging to a certain topic
	function getTopic(topic){

		// Get correct title and subtitle
		if (topic === "income"){
			titel = "Yearly income";
			subtitel = "x 1000 euro";
		}
		else if (topic === "birthsanddeaths"){
			titel = "Amount of births and deaths";
			subtitel = "Per 1000 people";
		}
		else if (topic === "causesofdeath"){
			titel = "Causes of Death";
			subtitel = "Per 1000 people";
		}
		else if (topic === "migration"){
			titel = "Migration";
			subtitel = "Percentages";
		}
		else if (topic === "socialsecurity"){
			titel = "Social Security";
			subtitel = "Per 1000 people";
		}
		else if (topic === "education")
		{
			titel = "Highest level of Education";
			subtitel =  "Per 1000 people";
		}

		return texts = {
			titel : titel,
			subtitel : subtitel
		};
}


// Get the chosen province
function getChosenProvince(currentProvince){

	if (document.querySelector(".filled") != null){
		currentProvince = document.querySelector('.filled').id
		if (currentProvince === "Limburg"){
			currentProvince = "Nederland";
		}
	}

	return currentProvince;
}


// Function for easier d3 translations
function translation(x,y) {
	return 'translate(' + x + ',' + y + ')';
}
