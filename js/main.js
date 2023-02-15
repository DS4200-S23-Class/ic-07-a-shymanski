/*
D3 ic - 07
Aiden Shymanski
Modified: 02/15/2023
*/

const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// Add 
const FRAME = 
d3.select("#vis1")
	.append("svg")
		.attr("height", FRAME_HEIGHT)
		.attr("width", FRAME_WIDTH)
		.attr("class", "frame");

// Binding data
const data = [55000, 48000, 27000, 66000, 90000];

// Add points based on dat
FRAME.selectAll("points")
		.data(data)
		.enter() // loops through all points in data1
		.append("circle")
			.attr("cx", 0 + MARGINS.left)
			.attr("cy", (d) => {return d;})
			.attr("r", 20)
			.attr("class", "point");

// Scaling functions

const MAX_Y = d3.max(data, (d) => {return d;});
console.log("Max x: " + MAX_Y);

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

// scale function
const Y_SCALE = d3.scaleLinear()
					.domain([0, (MAX_Y + 10000)])
					.range([0, VIS_HEIGHT]);

FRAME.selectAll("points")
		.data(data)
		.enter()
		.append("circle")
			.attr("cx", MARGINS.left)
			.attr("cy", (d) => {
				return (Y_SCALE(d) + MARGINS.bottom);
			})
			.attr("r", 5)
			.attr("class", "point");

// add an axis
FRAME.append("g")
		.attr("transform",
		"translate(" + MARGINS.left + "," + (VIS_WIDTH + MARGINS.top + ")"))
		.call(d3.axisLeft(Y_SCALE).ticks(4));