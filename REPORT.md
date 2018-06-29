# Report 

## Description
Recently, it became known that the number of baby's born with a birth defect is alarmingly higher in Limburg than in any other province of the Netherlands: 3.84% in Limburg compared to the national average of 2.84% (Source).

This raises the question of how Limburg is different from other provinces in the Netherlands, and what the potential reasons for this difference in the number of baby's born with a birth defect are.

Is Limburg, for instance, different in population structure, income, social security, or any other factor?

This visualization explores the differences between Limburg and the rest of the Netherlands on a number of different topics: population size, population structure, amounts of births and deaths, causes of death, income, social security, education, and migration.

This is accomplished with three visualizations: a map with population size per province, a population pyramid with the relative population per age group for Limburg and a chosen province, and a grouped bar chart that uses a dropdown to display the differences between Limburg and a chosen province on a chosen topic. 

Below you can find a screenshot of the visualizations.

<img src="https://github.com/SammyH1994/project/blob/master/doc/screenshot1.png" />
Image 1: Screenshot of application

## Technical design
The website starts on the homepage, where a small explanation is given and a simple barchart displays the difference in birth defects between Limburg and the Netherlands.
The user can navigate between the home page, visualizations, about section and to my github source page.

On the visualizations page, the user first sees a small text explanation about the page. Then, using a scroll button, the user can scroll down to the first visualization: the map of the Netherlands containing the population size per province. Using the slider, a year between 2006 and 2015 can be chosen, which will change the map.

The user can then click on the map, choosing a province of interest. When clicking on the map, the page will scroll down to the second and third visualizations: the pyramid and the barchart. Limburg will then be compared with the chosen province (If Limburg is clicked, the whole Netherlands will be used for comparison). These two charts can also be updated by choosing a year using the slider. Additionally, in the bar chart the user is able to choose a topic using the drop down menu. 

The user can scroll back to the map using the pink scroll button. 

Below the map and the pyramid, the user can click the button "Extra information". This button creates a pop up window with additional information about the population pyramid and the barchart.

When no data is available, an alert message is shown (this only happens with "social security" barchart data for the year 2006.

In order to implement the functionality in my code, several javascript files with different functionality have been implemented, consisting of several files and functions. All visualizations have their own js file, with their own functions. Additionally, there is an index.js file that handles the flow of the program. A file called data.js contains a few additional functions, and the file homebar.js is a separate file that creates the visualization on the homepage.

The file/function structure is futher shown in the table below.

### Function diagram
|Function Name           |Description                                                        |Filename   | 
|------------------------|-------------------------------------------------------------------|-----------|
|***Map***               |                                                                   |           |                               
|createMap               |creates the initial map                                            |map.js     | 
|updateMap               |updates the map                                                    |map.js     |
|getPopulation           |gets the population size for a certain province                    |map.js     |
|                        |                                                                   |           |                               
|***Population Pyramid***|                                                                   |           |                               
|createPyramid           |creates the initial population pyramid                             |pyramid.js | 
|updatePyramid           |updates the population pyramid                                     |pyramid.js |
|                        |                                                                   |           |                               
|***Bar chart***         |                                                                   |           |                               
|createBarchart          |creates the initial bar chart                                      |barchart.js| 
|updateBarchart          |updates the bar chart                                              |barchart.js|
|                        |                                                                   |           |                               
|***General functions*** |                                                                   |           |                               
|getProvinceData         |retrieves the data for a chosen province                           |data.js    |
|changeDataValues        |changes the data of 3 topics to be per 1000 people                 |data.js    |
|translation             |function for d3.translation                                        |data.js    |
|***Event listeners***   |                                                                   |           |
|on.("click")            |will update the visualizations when the map is clicked             |map.js   |
|changetopic             |will update the bar chart on dropdown selection                    |index.js   |
|changeYear              |will update the visualizations when a year is chosen via the slider|data.js   |
                                          
Table 1: Diagram with components

## Challenges
- The first challenge I had was with converting the data to JSON format, which took some time. Eventually, I got this to work using my python script.
- The second challenge concerned the data for the population pyramid. The data was not per gender, so I eventually decided to create 1 pyramid that contained the population of Limburg on the left and the other province on the right, instead of two pyramids with a gender divide. I decided that this was a good choice, both because gender was not a main factor, and because this makes it easier to compare two provinces.
- Then, I struggled with the grouped bar chart, which gave me a lot of issues with updating. Eventually, I fixed these issues.
- My next challenge was that I would have liked to add another graph which had the actual data concerning birth defects per province per year. Unfortunately, the researcher was not able to provide me this data. Therefore, I decided to have a simple bar chart with the percentage of Limburg and the Netherlands on the homepage (from the news article), just to visualize the difference.
- Another issue that arised was with the map. Groningen would not be drawn. This had to do with the fact that it was the first path to be drawn, and apparently because I already drew my legend it would not draw the first path. This was fixed by drawing the legend after the map.
- My next issue with the map was with the hovering. At first, I changed the opacity on hover, but I was told that this might be confusing since the color, and thus the value, might seemingly change. It was suggested to change the border color, but this did not work since the paths of my map are drawn on top of each other and thus some provinces' borders would only be colored partly. Therefore, I decided to only have the tooltip on hover. Instead, I added a pattern on top of the color when the map is clicked, which stays like this until another province is chosen. This way, it is clear which province is chosen at the moment. The tooltip provides enough indication that a certain province is hovered over.
- Another issue I had was with using global variables for things like svg, width and height, since these need to be used in both the create and the update functions. Eventually, my create functions return a dictionary that contain all these variables, which is then provided as input to the update functions.
- My final issue was with the slider and the map. I changed sliders on the last Thursday, but did not realize until Friday morning that now, when a province is clicked first, and then the slider is used, the province on the two charts changes back to the Netherlands. It took me the entire day to fix this issue, together with the assistants. The final solution is not very elegant/efficient code-wise, but at least I managed to fix the issue on time. 
- Eventually, I thought I had fixed the issues with the interaction between the slider/map and barchart and submitted my project, but when I wanted to make the video I found out that there was still something wrong. I could not live with this issue, so I decided to still fix it, even though the deadline had expired. Eventually, I got everything to work and I have decided to commit it to a new repo even though I am late, since I really want a working product. The only remaining bug is one that I cannot seem to fix: when the page is open and you first click a province on the map and then use the rest of the page, everything works like it should. If you, however, start with using the slider when the page has loaded, the fill pattern on the map does not work if you click on a province. Instead, the province will turn black. I do not understand why this happens, since the CSS element does seem to have the correct fill pattern. It seems like this is a bug that I cannot fix. The rest of the website does work like it should in this case, just the fill color is not what it should be. 

## Decisions
I feel like in the end, my visualization is nearly the same as I had imagined. The only big change is that I had to change the population pyramid to have 1 instead of 2 pyramids. As I explained above, I feel like this is a more clear solution that is better for comparison between provinces. Additionally, the map now does not have a hover over effect. In an ideal world, I would have liked to change the border colors, but this did not work out. In the end, I feel like the tooltip should be clear enough.
In addition, I would have liked to create a more elegant solution for the slider issue that I had at the last moment, but I simply did not have enough time. In an ideal world, I would have taken more time to make this more efficient, and also would have spend a bit more time looking over my code and making sure the code is efficient enough.


