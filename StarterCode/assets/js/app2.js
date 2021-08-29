var margin = {
    top: 30,
    bottom: 30,
    right: 40,
    left: 40
};

var svgHeight = 550 - margin.bottom - margin.top;
var svgWidth = 1000 - margin.right - margin.left;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", 1000)
    .attr("height",550)
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

d3.csv("assets/data/data.csv").then(function(data){

    var x = d3.scaleLinear()
        .domain(d3.extent(data,d=>d.income))
        .range([0,svgWidth]);
    svg.append("g")
        .attr("transform",`translate(0,${svgHeight})`)
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.obesity))
        .range([svgHeight,0]);
    svg.append("g")
        .call(d3.axisLeft(y));


    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx",d=>x(d.income))
        .attr("cy",d=>y(d.obesity))
        .attr("r",10)
        .attr("opacity", "0.5")
        .style("fill","#a3dbba" );

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", svgWidth/2)
        .attr("y", svgHeight -10)
        .text("Income");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("x", -250)
        .attr("y",10)
        .attr("dy", "1em")
        .text("Obesity");

    svg.selectAll(null).data(data).enter()
        .append("text")
        .attr("x",d=>x(d.income))
        .attr("y",d=>y(d.obesity))
        .text(d=>d.abbr)
        .attr("font-size", "10px")
        .attr("text-anchor", "middle");


});
