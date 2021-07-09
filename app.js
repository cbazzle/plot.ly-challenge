var bellybuttonData;
// Fetch the JSON data and console log it
d3.json("data/samples.json").then(function(data) {
  bellybuttonData = data;
  var select = document.getElementById('selDataset');
  var firstValue = 0;

  // Dropdown functionality 
  for (var i in data.names){
    var opt = document.createElement('option');
    opt.value = data.names[i];
    opt.innerHTML = data.names[i];
    if (firstValue == 0) {
      firstValue = data.names[i];
    }
    select.appendChild(opt);
  }
  // Have the first sample name auto-populate the dropdown
  optionChanged(firstValue);
});

// Demographic information
optionChanged = function(name) {
  var div = document.getElementById('sample-metadata');
  for (var i in bellybuttonData.metadata){
    if (bellybuttonData.metadata[i].id == name){
      div.innerHTML = "ID: " + bellybuttonData.metadata[i].id + "<br> ETHNICITY: " + bellybuttonData.metadata[i].ethnicity
      + "<br> GENDER: " + bellybuttonData.metadata[i].gender + "<br> AGE: " + bellybuttonData.metadata[i].age
      + "<br> LOCATION: " + bellybuttonData.metadata[i].location + "<br> BBTYPE: " + bellybuttonData.metadata[i].bbtype
      + "<br> WFREQ: " + bellybuttonData.metadata[i].wfreq;
    }
  }

  // Get top ten values and labels for bar graph
  for (var i in bellybuttonData.samples){
    if (bellybuttonData.samples[i].id == name){
      var ids = bellybuttonData.samples[i].otu_ids;
      var values = bellybuttonData.samples[i].sample_values;
      var labels=bellybuttonData.samples[i].otu_labels;
      ids = ids.slice(0,10).reverse();
      for (var j in ids) {
        ids[j] = "OTU " + ids[j];
      }
      values = values.slice(0,10).reverse();
      labels = labels.slice(0,10).reverse();

      // Trace1 for the bellybutton data
      var trace1 = [{
        x: values,
        y: ids,
        text: labels,
        name: "Top 10 Bacteria Cultures Found",
        type: "bar",
        orientation: "h"
      }];

      // Apply the group bar mode to the layout
      var layout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };

      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", trace1, layout);
    }
  }
  
  for (var i in bellybuttonData.samples){
    if (bellybuttonData.samples[i].id == name){
      var ids = bellybuttonData.samples[i].otu_ids;
      var values = bellybuttonData.samples[i].sample_values;
      var labels=bellybuttonData.samples[i].otu_labels;
      
      // Trace1 for the bellybutton data
      var trace1 = {
        x: ids,
        y: values,
        mode: "markers",
        marker: {
          color: ids,
          opacity: [1, 0.8, 0.6, 0.4],
          size: values
      }
    };
    
      var data = [trace1];
    
      var layout = {
        title: "Bacteria Cultures Per Sample",
        showlegend: false,
        height: 600,
        width: 1200
      };
    
      // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", data, layout);
    }
  }
}