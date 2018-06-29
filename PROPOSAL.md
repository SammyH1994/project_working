## Project Proposal

### Problem Statement
Recently, it became known that the number of baby's born with a birth defect is alarmingly higher in Limburg than in any other province of the Netherlands: 3.84% in Limburg compared to the national average of 2.84% ([Source](https://www.limburger.nl/cnt/dmf20180524_00062550/alarmerend-meer-baby-s-met-afwijkingen-in-limburg)). 

This raises the question of how Limburg is different from other provinces in the Netherlands, and what the potential reasons for this difference in the number of baby's born with a birth defect are. 

Is Limburg, for instance, different in population structure, income, social security, or any other factor?

This question is interesting not only for the population of Limburg (and specifically those who have or wish to start a family there), but also for potential future residents of Limburg who are trying to decide where in the Netherlands they want to settle.

### Solution
This visualization aims to compare Limburg to the other provinces of the Netherlands with regards to several variables: population size, population structure, births and deaths, migration background, causes of death, work, income, social security, education, traffic and transport, environment, and soil use. 

This will be accomplished by having three interactive visualizations: a map of the Netherlands that visualizes relative population size per province, two population pyramids that compare Limburg to a certain province that is chosen by clicking on the map, and a grouped barchart that shows the data of a chosen topic for both Limburg and a chosen province of the map. A sketch of the visualization can be found below.

<img src="https://github.com/SammyH1994/project/blob/master/doc/sketch.png" />
Image 1: sketch of visualization

### Visualization features
- A year between 2005 and 2015 can be chosen using the slider. This will change all three visualizations to show the data for the respective year. If data for a certain year is unavailable, the user will be notified.
- The map shows the relative population size per province of the Netherlands. On hover, the province will be highlighted and the percentage will be shown in a d3 tip.
- If a province on the map is clicked, both the population pyramid and the bar chart will be updated for the chosen province. This province is then compared to Limburg in the two visualizations.
- If Limburg is clicked, the population pyramid and bar chart will show the values for the average of the Netherlands compared to Limburg.
- The population pyramid shows the population structure (per age and per gender) for Limburg and the chosen province. On hover, a certain bar will light up and the data will be shown in a d3 tip.
- The grouped bar chart shows data on a topic that is chosen using the drop-down menu, for both Limburg and the chosen province. Each topic has a few related variables. For instance, births vs deaths has information on both births and deaths, and migration background has information about the total amount of immigrants and the amount of both Western and non-Western immigrants. Again, hovering over a bar will highlight the bar and show the data in a tip.

These are all features for a minimum viable product. A fourth visualization may be added later if time permits it.
- Another extra feature will be nice transitions in all graphs when they are updated.

### Prerequisites

#### Data sources
The data that will be used is CBS regional data. This data will have to be transformed from CSV format to JSON format.  
[Data source](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/70072ned/table?ts=1528142338597)

#### External components
- d3 tip
- geojson/topojson/datamaps
- bootstrap

#### Similar Visualizations
- [Compare your country](http://www.oecd.org/statistics/compare-your-country.html).   
This site lets you choose a topic, which you can then compare for different countries. The different topics have different visualizations. For instance, "OECD economic outlook" has a world map, but you can switch to different visualizations such as trends and rankings. This is similar to what I want to do, but still quite different. The main similarity is that it compares different regions for a certain topic, using different visualizations. However, the implementation is very different from what I want to do.
- [EPI Country Comparison](http://visuals.datadriven.yale.edu/countrycompare/).  
This site lets you compare a selection of countries on different variables with multiple visualizations. Although this site uses different visualizations and compares countries instead of provinces, the idea is a bit similar in that it looks at the differences between regions with regards to different factors. The implementation is again quite different from my idea.
- [Population Pyramid](https://bl.ocks.org/borgar/b952bb581923c9993d68).  
This is a nice example of a population pyramid. My implementation will probably be quite similar, although I would like to have two pyramids with the y axis on the far right instead of in the middle of the pyramids. 
- [Grouped barchart](https://bl.ocks.org/mbostock/3887051).  
This is a grouped bar chart that compares the population size of different states. My implementation would have two provinces instead of different states, and will not be about population size but about a topic chosen with the drop-down menu.
- [Map of the Netherlands](http://bl.ocks.org/phil-pedruco/9344373).  
This is a d3 map of the Netherlands, which can be useful for creating my map, especially the nld.json file.
    
#### Difficult components
- Figuring out how to make the population pyramid
- Transitions
- Using the same dataset to create different types of visualizations

