#################################################
# Flask Application
#################################################

# Dependencies and Setup
from flask import Flask, jsonify, json, request
import pandas as pd
import numpy as np

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Python Connection Setup
#################################################
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

#################################################
# Flask Routes
#################################################
@app.route("/jsonified")
def jsonified():

    all_companies = []

    return jsonify(all_companies)

@app.route("/companies")
def companies():
    """Return a List of Company Data: Company Names and Locations (Latitude & Longitude) of Each Company"""
    # Query All Companies
    results = session.query(Company).all()

    # Create a Dictionary from the Row Data and Append to a List of all_companies
    all_companies = []
    for company in results:
        company_dict = {}
        company_dict["Company Name"] = company.name
        company_dict["Company Latitude"] = company.latitude
        company_dict["Company Longitude"] = company.longitude
        all_locations.append(company_dict)

    return jsonify(all_companies)

# Define Main Behavior
if __name__ == '__main__':
    app.run(debug=True)