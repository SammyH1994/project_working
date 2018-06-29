# Process
## Week 1
### Day 1
- Searched for the needed data
- Created sketch
- Wrote proposal

### Day 2
- Worked on Design
- Adjusted CSV files 
- Started on adapting convertCSV2JSON.py to be able to have nested JSON with topics and subtopics

### Day 3
- Finished convertCSV2JSON.py
- All data is now converted to JSON format
- Finished Design
- Started on Prototype
- Decided to have 2 pages: visualization and about

### Day 4
- Finished prototype
- Started on map

### Day 5 
- Presented idea

## Week 2
### Day 1
- Worked on map

### Day 2
- Map: data with values for population
- Map: colours with values for population
- Issue: population doesn't change much over years

### Day 3
- Map finished except for legend
- Population pyramid nearly finished
- Issue: age group data is not by gender, so traditional population pyramid is not possible.  
Solution right now: instead of two pyramids, have one pyramid, where the left side of pyramid is Limburg, right side is province X.  
Possible other solution: find data per gender. However, this data is per age instead of age group, so would have to be rewritten first.

### Day 4
- Worked on legend, issue with axis
- Population pyramid finished: still thinking about whether to change data
- Started on bar chart: working but not interactive yet and no linking.

### Day 5
- Presented progress  
Discussed the population pyramid: decided to change data to be per 5 years, but not have 2 bar charts with a division between gender.
Gender is not that relevant for my story and one pyramid makes it easier to compare between provinces
- Changed map data, now has water!
- Started on updating grouped bar chart

## Week 3
### Day 1
- Worked on updating bar chart, had a lot of issues with changing amount of bars
- Updating now works, legend works, still issues with tooltip
- Decided to maybe add a line chart with the prevalence of birth defects per province over the years. Could not find data unfortunately. Decided to e-mail Luc Smits (lead researcher of the study on birth defects in Limburg) to ask for this data.

### Day 2
- Fixed bar chart tooltip
- Fixed bar chart transitions --> first time now also transitions into screen
- Fixed map legend
- Got correct data for pyramid, adjusted CSV files with this data, adjusted code for pyramid
- E-mailed Luc Smits to ask for data, he already responded.  
Unfortunately he will not give me the data. Therefore, there will be no line chart with the birth defects per year.  
Still have to think if I will add something else, but not sure if there is time to find new data, process this and make another visualization.
- Figured out how to check for empty data in the bar chart --> now have to create an alert message or something to show when some data is missing. 

### Day 3
- Worked on implementing bootstrap grid --> still doubting lay out of the three graphs and slider
- Changed bar char data to be better for comparison (per 1000 people for causes of death, education and social security instead of absolute numbers)

### Day 4
- Worked on updating map instead of drawing new map
- Had an issue where Groningen (the first province in the json file) would not be drawn in the path
- Worked on changing the titles/subtitles for the bar chart: had issues with placing two texts below each other.
- Worked on adding an alert if there is missing data in the bar chart --> only works the first time, need to check this

To do: 
- Check interactions between slider/topic/clicking on map: have a feeling this sometimes does not work correctly
- Styling of site
- Improve code
- Add a home page with a small explanation of the website
- Add text in the "About" section

### Day 5
- Presented progress
- Got tips on map hovering (not change opacity because this confuses the viewer on the values) and styling of page (placement of graphs)

## Week 4
### Day 1
- Worked on map hovering:
Had an issue with changing the border color on hover, because the path is drawn in such a way that provinces are written on top of each other. Because of this, not all parts of all province' borders are changed on hover. Also attempted to get stripes on top of the color on clicking, but this did not work out.
- Worked on changing the lay out of the page, added scroll buttons. When the map is clicked, the page scrolls down to the other graphs.
- Worked on the Home page, where a simple bar chart displays the difference between Limburg and the Netherlands in the amount of baby's born with a birth defect.

### Day 2
- Worked on styling of the page: backgrounds, headers, fonts etc
- Worked on the map hovering: on click stripes on top of the color now works. Still have to figure out what to do on hover. 

### Day 3
- Worked on styling
- Worked on code
- Decided not to have a map hover effect, just the tooltip, because changing the color obscures the values and borders do not work nicely
- Worked on an info pop up button for barchart & pyramid
- Fixed issues with alert
- Changed slider

### Day 4
- Finalized changing slider
- Worked on code
- Worked on styling
- Worked on text on pages
- Worked on pop up info about charts

### Day 5
- Worked on final styling/code
- Worked on the texts on the pages
- Worked on the report
- Had a big issue with the new slider and the interaction with the map. This was only solved at the last minute with a not so elegant solution.
