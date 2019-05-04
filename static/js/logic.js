// Analysis of Data Jobs in the Market - Javascript

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

// Create baseMaps Object to Hold Base Layers
var baseMaps = {
  "Streets": streetsMap,
  "Light": lightMap
};

// Create Map Object & Set Default Layers
var myMap = L.map("map", {
  center: [37.7749295, -122.4194155],
  zoom: 15.5,
  layers: [streetsMap]
});

// Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
L.control.layers(baseMaps).addTo(myMap);

// Cluster Markers
// Retrieve LinkedIn Data with from JSON File Converted to JavaScript Variable (data)
  var markers = L.markerClusterGroup();
  // Loop Through Data
  for (var i = 0; i < data.features.length; i++) {
      // Add a New Marker to the Cluster Group & Bind a Pop-up
      markers.addLayer(L.marker([ data.features[i].geometry.coordinates[0],  data.features[i].geometry.coordinates[1]])
        .bindPopup( data.features[i]["company"]));
  }
  // Add Cluster Marker Layer to the Map
  myMap.addLayer(markers);
// });