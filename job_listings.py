
# Dependencies and Setup
import pandas as pd
import numpy as np

# File to Load (Remember to Change These)
file_to_load = "data/job_listings.csv"

# Read Purchasing File and store into Pandas data frame
job_listings_df = pd.read_csv(file_to_load, encoding="ISO-8859-1")
revised_job_listings_df = job_listings_df.dropna(how="all")
revised_job_listings_df


# Reorganize Column Names
job_listings = job_listings_df.rename(columns={"job_title":"Job Title", 
                                                      "company":"Company Name", 
                                                      "rating":"Rating", 
                                                      "reviews":"Reviews", 
                                                      "location":"Location", 
                                                      "job_description":"Job Description"}) 
job_listings

# Dependencies
import requests
import json

# Retrieve Google API key from config.py
from config_3 import gkey

# What are the geocoordinates (latitude/longitude) of the Company Names?
company_list = list(job_listings["Company Name"])

# Build URL using the Google Maps API
base_url = "https://maps.googleapis.com/maps/api/geocode/json"
new_json = []

for target_company in company_list:
    params = {"address": target_company, "key": gkey}
    
    # Run Request
    response = requests.get(base_url, params=params)

    try: 
        # Extract lat/lng
        companies_geo = response.json()
        # print(companies_geo)
        lat = companies_geo["results"][0]["geometry"]["location"]["lat"]
        lng = companies_geo["results"][0]["geometry"]["location"]["lng"]
        new_json.append({"company": target_company,"lat": lat,"lng": lng})
    except IndexError:
        print(new_json)


from sys import argv
from os.path import exists
import simplejson as json 

geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "company": d["company"],
        "geometry" : {
            "type": "Point",
            "coordinates": [d["lat"], d["lng"]],
            },
     } for d in new_json]
}

print(geojson)

# Dependencies and Setup
from flask import Flask, jsonify, json, request, render_template
import pandas as pd
import numpy as np

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/jsonified")
def jsonified():
    return jsonify(geojson)


# Define Main Behavior
if __name__ == "__main__":
    app.run(debug=True)