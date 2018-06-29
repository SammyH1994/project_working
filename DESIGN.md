# Design
## Data
### Data sources
#### Main data set
[CBS Data per province](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/70072ned/table?ts=1528142338597)
#### Map
I will either use the nld.json file from [this D3 visualization](http://bl.ocks.org/phil-pedruco/9344373) or use [datamaps](http://datamaps.github.io/).

### Data usage
The data from CBS can be downloaded as a CSV file. 10 files will be downloaded, one for each year (2006-2015).  
This is done since all visualizations will show the data for a chosen year. This will make searching through the files for a certain topic for a certain year a bit more efficient.  

The CSV files will be converted to JSON format using python. However, since the CSV files that are retrieved from CBS are not in a format that is easily converted to JSON, they will have to be preprocessed manually. When downloaded, there are multiple "header rows" per column, since most values are taken from a topic and one or more subtopics. For instance, a part of the downloaded data looks like this:

|Regionale kerncijfers Nederland|           |                |                                     |
|---------|-----------|--------------------------------------|-------------------------------------|
|         |Onderwerpen| Bevolking                            | Bevolking                           |
|         |Onderwerpen| Bevolkingssamenstelling op 1 januari | Bevolkingssamenstelling op 1 januari|
|         |Onderwerpen| Totale Bevolking                     | Geslacht                            |
|         |Onderwerpen| Totale Bevolking                     | Mannen                              |
|         |Onderwerpen| Totale Bevolking                     | Mannen                              |
|         |Onderwerpen| Totale Bevolking                     | Mannen                              |
|         |Onderwerpen| Totale Bevolking                     | Mannen                              |
|Regio's  |Perioden   | Aantal                               | Aantal                              |
|Nederland|2006       | 16334210                             | 8077407                             |
|Groningen|2006       | 574042                               | 285089                              |

Table 1: excerpt CBS CSV data 2006.

Therefore, before the data is converted to JSON, the CSV data (file per year) is changed to the following format:

|province |population/total|population/male|
|---------|----------------|---------------|
|Nederland|16334210        |8077407        |
|Groningen|574042          |285089         |

Table 2: excerpt adjusted CSV data 2006.

Now, there is only one header, which contains information about the topic and the subtopic. Each topic (except province, which does not have a subcategory) has subtopics one maximally one level deep. The subtopic is separated by a slash (/).

These CSV files will then be transformed to JSON files using  a python script (convertCSV2JSON.py. The headers will be split on the slash so that sub-dictionarys can be created per main topic. The structure will be as follows:

```javascript
{"data_2006":
[
      {
            "province": "Nederland",
            "population": {
                  "total": "16334210",
                  "male": "8077407",
                  "female": "8256803",
                  etc...
                  },
            "migration": {
                  "dutch": "80.7",
                  "non-dutch": "19.3",
                  "western": "8.7",
                  "non-western": "10.5"
                  },
            etc...
      }
]}
```

## Components

### Function diagram
|Function Name           |Description                                                        |Filename   | 
|------------------------|-------------------------------------------------------------------|-----------|
|***Map***               |                                                                   |           |                               
|createMap               |creates the initial map                                            |map.js     | 
|updateMap               |updates the map                                                    |map.js     |
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
|getProvinceData (Optional)|retrieves the data for a chosen province                           |data.js    |
|***Event listeners***   |                                                                   |           |
|onClick                 |will update the visualizations when the map is clicked             |index.js   |
|onSelect                |will update the bar chart on dropdown selection                    |index.js   |
|onSlide                 |will update the visualizations when a year is chosen via the slider|index.js   |
                                          
Table 3: Diagram with components

### Program flow
- index.html is the main html file that will create the webpage.  
It will also call style.css, all scripts and plugins.  
- style.css contains the stylesheet for the webpage.
- index.js is the main script that will contain the flow of the program  
It will first load the data per year (10 json files) when the window is loaded (onload function) using D3 queue.  
Then (callback function) it will create the initial state of the visualization. It will first get the necessary data (Limburg and the Netherlands) with getProvinceDate. Then it will create the visualizations using createMap, createPyramid and createBarchart.  

Subsequently, a few events can happen:
1. a province on the map is clicked. This will call the onClick function, which will retrieve the required data using the getProvinceData function, and will then update the pyramid and barchart using the updatePyramid and updateBarchart functions.
2. a year is chosen using the slider. This will call the onSlide function, which will again retrieve the date using getProvinceData and create all visualizations using createMap, createPyramid, createBarchart.
3. a bar chart topic is chosen using the drop down menu. From the current data, the date from the selected topic will be retrieved, after which the bar chart will be updated using the updateBarchart function.
4. the user hovers over a datapoint of one of the visualizations. Using d3tip, a tooltip will be created. This is part of the functions that create/update the visualizations.

Note: the getProvinceData function is optional. It may not be necessary to have a separate function to retrieve a province's data. This will depend on possible duplicate code.

### Sketch with functions
Below you can find the updated sketch with the functions that handle events.

<img src="https://github.com/SammyH1994/project/blob/master/doc/sketch_functions.png" />
Image 1: sketch of visualization with functions

## Plugins/libraries
Required:
- d3 tip
- d3 queue
- d3 container
- d3 collections
- d3 legend
- topoJSON/datamaps
- bootstrap

Optional:
- d3 scale-chromatic
