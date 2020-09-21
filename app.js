// d3.json("data/samples.json").then((importedData) => {
    // console.log(importedData);
// })

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