# Sammy Heutz
# 10445765
# 
# convertCSV2JSON.py converts csv files to json files.
# Help from: https://stackoverflow.com/questions/19697846/how-to-convert-csv-file-to-multiline-json
# Adapted to create nested JSON structure with topics and subtopics, in csv header as topic/subtopic.

import json
import csv

#Read CSV File
def read_CSV(file, json_file):
	csv_rows_total = []
	with open(file) as csvfile:
		
		reader = csv.DictReader(csvfile)
		fields = reader.fieldnames
		fieldnames = []
		fieldlists = []

		# Split topics and subtopics on /
		for i in range(len(fields)):
			fieldlist = (fields[i].split("/"))

			# Create list with lists of topic + subtopic
			fieldlists.append(fieldlist)

			# Create list with the fieldnames
			if fieldlist[0] not in fieldnames:
				fieldnames.append(fieldlist[0])

		# Create dict for each row
		for row in reader:

			csv_rows = {}
			subdict = {}

			for i in range(len(fields)):

				# If there are no subtopics
				if len(fieldlists[i]) == 1:

					# Key = fieldname, value = row value
					csv_rows[fieldnames[i]] = row[fields[i]]

				else:
					
					# If we arrive at a new topic, empty subdictionary
					if fieldlists[i][0] != fieldlists[i - 1][0]:
						subdict = {}

					# The key of a fieldname consists of a subdictionary
					csv_rows[fieldlists[i][0]] = subdict

					# The subdictionary gets the subtopic as key and the rowvalue as value
					subdict[fieldlists[i][1]] = row[fields[i]]

			# Add row dictionary to total list
			csv_rows_total.append(csv_rows)

		convert_write_json(csv_rows_total, json_file)

#Convert csv data into json
def convert_write_json(data, json_file):
	with open(json_file, "w", encoding='ascii') as f:
		f.write("{")
		f.write("\"{}\":\n".format(name))
		f.write(json.dumps(data, sort_keys=False, indent=4, separators=(',', ': ')))
		f.write("\n}")


# List with years
years = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"]

for i in range(len(years)):
	name = "data_" + years[i]
	file = name + ".csv"
	json_file = name + ".json"
	read_CSV(file,json_file)
