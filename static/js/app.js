// Declare a variable to hold the URL where the data can be found
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Declare variables to hold the html elements
let dataSelector = d3.select("#selDataset");
let demoDisplay = d3.select("#sample-metadata");

// Load the JSON data
d3.json(url).then(function(data){

    // Populate the HTML drop down menu with the subject IDs
    let subjects = data.names;
    dataSelector.selectAll("option")
        .data(subjects)
        .enter()
        .append("option")
        .text(function(d){return d; });



    // Initialize demographic information and graphs to print to screen
    function init(){
        firstID = data["names"][0];

        // Get demographic information for the first ID
        let demoInfo = data.metadata.filter(function(meta){return meta.id === Number(firstID);});
        
        // Print the demographic information to the screen
        demoDisplay.html("<p>id: "+demoInfo[0]['id']+"</p>"
                        + "<p>ethnicity: "+demoInfo[0]['ethnicity']+"</p>"
                        + "<p>gender: "+demoInfo[0]['gender']+"</p>"
                        + "<p>age: "+demoInfo[0]['age']+"</p>"
                        + "<p>location: "+demoInfo[0]['location']+"</p>"
                        + "<p>bbtype: "+demoInfo[0]['bbtype']+"</p>"
                        + "<p>wfreq: "+demoInfo[0]['wfreq']+"</p>"
                        );
        
        // Get sample data for the selected subject
        let graphInfo = data.samples.filter(function(samp){return samp.id === firstID;});

        // Print a bar graph to the screen using the sample data
        let barValues = [];
        let barLabels = [];
        let barHover = [];

        for (i=0; i<10; i++){
            barValues.push(graphInfo[0]["sample_values"][i]);
            barLabels.push("OTU "+graphInfo[0]["otu_ids"][i]);
            barHover.push(graphInfo[0]["otu_labels"][i]);
        };

        let barData = [{
            x: barValues.reverse(),
            y: barLabels.reverse(),
            type: 'bar',
            orientation: 'h',
            hovertext: barHover.reverse()
        }];

        Plotly.newPlot('bar', barData);

        // Print a bubble graph to the screen using the sample data
        let bubbleData = [{
            x: graphInfo[0]["otu_ids"],
            y: graphInfo[0]["sample_values"],
            mode: 'markers',
            marker: {
                size: graphInfo[0]["sample_values"],
                color: graphInfo[0]["otu_ids"],
            },
            text: graphInfo[0]["otu_labels"],
            type: 'scatter'
        }];

        Plotly.newPlot('bubble', bubbleData);
    };



    // Handle dropdown change event
    dataSelector.on("change", function(){
        let selection = this.value;

        // Get demographic information for the selected subject
        let demoInfo = data.metadata.filter(function(meta){return meta.id === Number(selection);});
        
        // Print the demographic information to the screen
        demoDisplay.html("<p>id: "+demoInfo[0]['id']+"</p>"
                        + "<p>ethnicity: "+demoInfo[0]['ethnicity']+"</p>"
                        + "<p>gender: "+demoInfo[0]['gender']+"</p>"
                        + "<p>age: "+demoInfo[0]['age']+"</p>"
                        + "<p>location: "+demoInfo[0]['location']+"</p>"
                        + "<p>bbtype: "+demoInfo[0]['bbtype']+"</p>"
                        + "<p>wfreq: "+demoInfo[0]['wfreq']+"</p>"
                        );
        
        // Get sample data for the selected subject
        let graphInfo = data.samples.filter(function(samp){return samp.id === selection;});

        // Print a bar graph to the screen using the sample data
        let barValues = [];
        let barLabels = [];
        let barHover = [];

        for (i=0; i<10; i++){
            barValues.push(graphInfo[0]["sample_values"][i]);
            barLabels.push("OTU "+graphInfo[0]["otu_ids"][i]);
            barHover.push(graphInfo[0]["otu_labels"][i]);
        };

        let barData = [{
            x: barValues.reverse(),
            y: barLabels.reverse(),
            type: 'bar',
            orientation: 'h',
            hovertext: barHover.reverse()
        }];

        Plotly.newPlot('bar', barData);

        // Print a bubble graph to the screen using the sample data
        let bubbleData = [{
            x: graphInfo[0]["otu_ids"],
            y: graphInfo[0]["sample_values"],
            mode: 'markers',
            marker: {
                size: graphInfo[0]["sample_values"],
                color: graphInfo[0]["otu_ids"],
            },
            text: graphInfo[0]["otu_labels"],
            type: 'scatter'
        }];

        Plotly.newPlot('bubble', bubbleData);
     
    }); 



    init();
});
