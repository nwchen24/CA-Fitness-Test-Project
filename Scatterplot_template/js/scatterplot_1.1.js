//This version incorporates mouseover

var margin = {top: 20, right: 50, bottom: 80, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Mouseover functionality - Text displayed will be defined below 
// How to change font, make solid fill, border color
var tip_test = d3.select('body')
  .append('div')
  .attr('class', 'tip')
  .style('border', '1px solid black')
  .style('background-color', 'solid white')
  .style('padding', '5px')
  .style('position', 'absolute')
  .style('display', 'none')
  .on('mouseover', function(d, i) {
    tip.transition().duration(0);
  })
  .on('mouseout', function(d, i) {
    tip.style('display', 'none');
  })
  ;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/Alameda_County_Scatterplot_test.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.Combined_Fitness_Unhealthy_Pct_All = +d.Combined_Fitness_Unhealthy_Pct_All;
    d.Mean_Academic_Test_Score_All = +d.Mean_Academic_Test_Score_All;
  });

  x.domain(d3.extent(data, function(d) { return d.Combined_Fitness_Unhealthy_Pct_All; })).nice();
  y.domain(d3.extent(data, function(d) { return d.Mean_Academic_Test_Score_All; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", 600)
      .attr("y", 50)
      .style("text-anchor", "end")
      .text("Proportion of Students in Unhealthy Fitness Zones");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", -50)
      .attr("y", -75)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Mean Academic Test Score")

  svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.Combined_Fitness_Unhealthy_Pct_All); })
      .attr("cy", function(d) { return y(d.Mean_Academic_Test_Score_All); })
      .style("fill", "A6CFAC")
      .on('mouseover', function(d, i) {
        tip_test.transition().duration(0);
        tip_test.style('top', y(d.Mean_Academic_Test_Score_All) + 55 + 'px');
        tip_test.style('left', x(d.Combined_Fitness_Unhealthy_Pct_All) + 'px');
        tip_test.style('display', 'block');
        tip_test.text(d.School);
      })
      .on('mouseout', function(d, i) {
        tip_test.transition()
        .delay(10)
        .style('display', 'none');
      })
      ;

  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});

d3.csv("data/Alameda_County_Scatterplot_test.csv", type, render_total);
