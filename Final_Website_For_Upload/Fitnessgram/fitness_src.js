//Load in counties from json file
		d3.json("CA_county.json", function(json) {
				console.log(json);
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
					.data(json.features)
					.enter()
					.append("path")
					.attr("d", path)
				   	.on("mouseover", function(d){
						var xPosition = width/2 + 150;
						var yPosition = height/2;
// 						var xPosition = parseFloat(path.centroid(this).attr("cx"));
// 						var yPosition = parseFloat(path.centroid(this).attr("cy"));
						d3.select("#tooltip")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px");
						d3.select("#county")
						.text(d.properties.NAME);
						d3.select("#tooltip")
						.classed("hidden", false);
						})
						.on("mouseout", function(){
						d3.select("#tooltip").classed("hidden", true);
						});
		
			});




		//Bind data
		d3.json("CA_county.json", function(json) {
			console.log(json);
			g.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("fill", "#ccc")
				.attr("stroke", "#333")
				.attr("d", path);
		});