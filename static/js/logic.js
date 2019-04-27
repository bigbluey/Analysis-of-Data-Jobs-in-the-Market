// Analysis of Data Jobs in the Market - Javascript

// Job Site API/URL Variables
var linkedinURL = ""
var indeedURL = ""
var glassdoorURL = ""

// Initialize & Create Three Separate LayerGroups: LinkedIn, Indeed & Glassdoor
var linkedin = new L.LayerGroup();
var indeed = new L.LayerGroup();
var glassdoor = new L.LayerGroup();

function createMap(jobs) {

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
  
    // Define baseMaps Object to Hold Base Layers
    var baseMaps = {
      "Streets": linkedinMap,
      "Grayscale": indeedMap,
      "Outdoors": glassdoorMap
    };
  
    // Create Overlay Object to Hold Overlay Layers
    var overlayMaps = {
      "LinkedIn": linkedin,
      "Indeed": indeed,
      "Glassdoor": glassdoor
    };
  
    // Create Map, Passing In satelliteMap, grayscaleMap & outdoorsMap Layers to Display on Load
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [linkedinMap, indeedMap, glassdoorMap]
    });
  
    // Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }