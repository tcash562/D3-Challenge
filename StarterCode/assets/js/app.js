// @TODO: YOUR CODE HERE!

function makeResponsive() {

var svgArea = d3.select("body").select("svg");

if (!svgArea.empty()) {
  svgArea.remove();
}

var svgHeight = window.innerHeight;
var svgWidth = window.innerWidth;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

 var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
 var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

 d3.csv("./assets/data/data.csv").then(function(data) {

  data.forEach(function (d) {
    d.poverty =+d.poverty;
    d.healthcare = + d.healthcare;
    d.abbr =  d.abbr;

  });

  var xScale = d3.scaleLinear()
                 .domain([d3.min(data, d => (d.poverty-0.2)) ,
                          d3.max(data, d => d.poverty) ])
                 .range([0, width]);

  var yScale = d3.scaleLinear()
                 .domain([d3.min(data, d=> (d.healthcare-1)),
                          d3.max(data, d => d.healthcare) ])
                 .range([height, 0]);

  var bottomAxis= d3.axisBottom(xScale).ticks(20);
  var leftAxis = d3.axisLeft(yScale).ticks(20);

  chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

  chartGroup.append("g")
            .classed("blue", true)
            .call(leftAxis);

 var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "12")
    .attr("fill", "green")
    .attr("opacity", ".5");


var text = chartGroup.selectAll(".stateText")
   .data(data)
   .enter()
   .append("text")
   .classed ("stateText", true)
   .attr("x", d => xScale(d.poverty))
   .attr("y", d => yScale(d.healthcare))
   .attr("font-size", "8px")
   .text(d => d.abbr)
  .attr("text-anchor", "middle")
  .attr("fill", "white");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Risk of Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty (%)");

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
      return (`<strong>${d.state}<strong><br>Poverty :${d.poverty}%<br> Risk of Healthcare :${d.healthcare}%`);
      });


    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(d) {
      toolTip.show(d, this);
    })

      .on("mouseout", function(d) {
        toolTip.hide(d);
      });

  }).catch(function(error) {
    console.log(error);
  });

};

makeResponsive();

d3.select(window).on("resize", makeResponsive);
