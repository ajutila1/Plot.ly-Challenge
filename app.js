function graphs(id) {
    d3.json("data/samples.json").then((importedData) => {
        console.log(importedData);

        var personData = importedData.samples.filter(sample => sample.id.toString() === id)[0];

        console.log(personData);

        var sampleValues = personData.sample_values.slice(0,10).reverse();
        console.log(sampleValues);

        var otuIDs = personData.otu_ids.slice(0,10).reverse();
        console.log(otuIDs);

        var otuIDsFinal = otuIDs.map(base => "OTU" + base)

        var otuLabels = personData.otu_labels.slice(0,10).reverse();
        console.log(otuLabels);

        var trace1 = {
            x: sampleValues,
            y: otuIDsFinal,
            text: otuLabels,
            type: "bar",
            orientation: "h",
        };

        var data1 = [trace1]

        Plotly.newPlot("bar", data1);

        var trace2 = { 
            x: personData.otu_ids,
            y: personData.sample_values,
            mode: "markers",
            marker: {
                size: personData.otu_ids,
                color: personData.sample_values
            },
            text: personData.otu_labels

            };

        var data2 = [trace2];

        Plotly.newPlot("bubble", data2);
    }
    
)};

function optionChanged(id) {
    graphs(id);
}

function init() {

    var dataSelect = d3.select("#selDataset");

    d3.json("data/samples.json").then((importedData) => {
        console.log(importedData);

        importedData.names.forEach(function(name) {
            dataSelect.append("option").text(name).property("value");
        });

        graphs(importedData.names[0]);
        
    });
}

init();