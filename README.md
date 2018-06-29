# What makes Limburg different?

Sammy Heutz  
Programmeerproject  
Minor Programmeren UvA 2018  

This is the second version of my programming project, in which a bug was fixed.

[Visualizations](https://SammyH1994.github.io/project_working)

[Demonstration video (in Dutch)](https://youtu.be/EGjwFnKRQTs)


### Problem Statement
Recently, it became known that the number of baby's born with a birth defect is alarmingly higher in Limburg than in any other province of the Netherlands: 3.84% in Limburg compared to the national average of 2.84% ([Source](https://www.limburger.nl/cnt/dmf20180524_00062550/alarmerend-meer-baby-s-met-afwijkingen-in-limburg)). 

This raises the question of how Limburg is different from other provinces in the Netherlands, and what the potential reasons for this difference in the number of baby's born with a birth defect are. 

Is Limburg, for instance, different in population structure, income, social security, or any other factor?

This question is interesting not only for the population of Limburg (and specifically those who have or wish to start a family there), but also for potential future residents of Limburg who are trying to decide where in the Netherlands they want to settle.

### Solution
This visualization aims to compare Limburg to the other provinces of the Netherlands with regards to several variables: population size, population structure, births and deaths, migration background, causes of death, income, social security, and education.

This is accomplished by having three interactive visualizations: a map of the Netherlands that visualizes population size per province, two population pyramids that compare Limburg to a certain province that is chosen by clicking on the map, and a grouped barchart that shows the data of a chosen topic for both Limburg and a chosen province of the map. The section visualization features further explains the features of the website. The section screenshots contains several screenshots of the website.

### Visualization features
- A year between 2006 and 2015 can be chosen using the slider. This will change all three visualizations to show the data for the respective year. If data for a certain year is unavailable, the user will be notified.
- The map shows the population size per province of the Netherlands. On hover, the the percentage will be shown in a d3 tip.
- If a province on the map is clicked, both the population pyramid and the bar chart will be updated for the chosen province. This province is then compared to Limburg in the two visualizations.
- If Limburg is clicked, the population pyramid and bar chart will show the values for the average of the Netherlands compared to Limburg.
- The population pyramid shows the population structure (per age) for Limburg and the chosen province. On hover, a certain bar will light up and the data will be shown in a d3 tip.
- The grouped bar chart shows data on a topic that is chosen using the drop-down menu, for both Limburg and the chosen province. Each topic has a few related variables. For instance, births vs deaths has information on both births and deaths, and migration background has information about the total amount of immigrants and the amount of both Western and non-Western immigrants. Again, hovering over a bar will highlight the bar and show the data in a tip.

### Screenshots
<img src="https://github.com/SammyH1994/project/blob/master/doc/screenshot2.png" />
Image 1: Screenshot of homepage

<img src="https://github.com/SammyH1994/project/blob/master/doc/screenshot1.png" />
Image 2: Screenshot of visualizations

<img src="https://github.com/SammyH1994/project/blob/master/doc/screenshot3.png" />
Image 3: Screenshot of About section

### Data sources
The data that was used is CBS regional data.  
[Data source](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/70072ned/table?ts=1528142338597)

All external sources that have been used for the code are noted atop of the js file that utilizes it

Other extensions that have been used (that have their own copyright notice) are:
- d3 (including several d3 extenstions)
- An adapted version of d3-tip for v4 (in a separate js file in the map src/code/js. The source is listed in this file
- Topojson
- Bootstrap
- jQuery
- Google Fonts
- Images from Unsplash.com.

### Author
Sammy Heutz, 10445765
