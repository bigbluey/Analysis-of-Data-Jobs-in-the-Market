// Analysis of Data Jobs in the Market - Javascript

// Job Site API/URL Variables
var linkedinURL = ""
var indeedURL = ""
var glassdoorURL = ""

// Initialize & Create Three Separate LayerGroups: LinkedIn, Indeed & Glassdoor
var linkedin = new L.LayerGroup();
var indeed = new L.LayerGroup();
var glassdoor = new L.LayerGroup();

// Define Variables for Tile Layers
var streetsMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Create baseMaps Object to Hold Base Layers
var baseMaps = {
  "Streets": streetsMap,
  "Light": lightMap,
  "Outdoors": darkMap
};

// Create overlayMaps Object to Hold Overlay Layers
var overlayMaps = {
  "LinkedIn": linkedin,
  "Indeed": indeed,
  "Glassdoor": glassdoor
};

// Create Map Object & Set Default Layers
var myMap = L.map("map", {
  center: [40.574236, -122.398989],
  zoom: 5.5,
  layers: [streetsMap, linkedin]
});

// Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);


// Radius Markers 
// Define markerSize Function that Gives Each City a Different Radius Based on its Job Listings
function markerSize(listings) {
  return listings / 20;
}
// Loop Through the Cities Array & Create One Marker For Each City Object
for (var i = 0; i < cities.length; i++) {
  // Conditionals for Cities Job Listings
  var color = "";
  if (cities[i].listings > 200) {
    color = "#C70039";
  }
  else if (cities[i].listings > 100) {
    color = "#FF5733";
  }
  else if (cities[i].listings > 90) {
    color = "#FFC300";
  }
  else {
    color = "#DAF7A6";
  }
  // Add Circles to Map
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust Radius
    radius: cities[i].listings * 1500
  }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Job Listings: " + cities[i].listings + "</h3>").addTo(myMap);
}


// Cluster Markers
// Retrieve LinkedIn Data with D3
d3.json(linkedinURL, function(response) {
  // Create a New Cluster Marker Group
  var markers = L.markerClusterGroup();
  // Loop Through Data
  for (var i = 0; i < response.length; i++) {
    // Set the Data Location Property to a Variable
    var cities = response[i].cities;
    // Check for Location Property
    if (cities) {
      // Add a New Marker to the Cluster Group & Bind a Pop-up
      markers.addLayer(L.marker([cities.coordinates[1], cities.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }
  }
  // Add Cluster Marker Layer to the Map
  myMap.addLayer(markers);

});