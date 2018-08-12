function getDomains (matrix) {
    if (matrix === []) {
	return [];
    }
    var height = matrix.length || 0;
    var width = (height > 0) ? (matrix[0].length || 0) : 0;
    var result = [];

    // 1 step offsets to count cell neighbours
    const offset = [[1,0],[0,1],[-1,0],[0,-1]];
    // keep track of cells counted as part of any dommain
    var takenCells = [];

    // find cell in array
    function isCellIn(cell, array) {
	return array.find(function(element) {
	    return cell[0] === element[0] && cell[1] === element[1];
	}) !== undefined;
    };

    for (i = 0; i < height; i++) {
	for (j = 0; j < width; j++) {
	    var domain = [];
	    // keep track of not checked cells neighboring domain so far
	    var neighbours = [];
	    
	    if (matrix[i][j] === 1) {
		neighbours.push([i,j]);
		
		while (neighbours.length > 0) {
		    var currentCell = neighbours.pop();

		    if (!isCellIn(currentCell, takenCells) &&
		       matrix[currentCell[0]][currentCell[1]] === 1) {
			domain.push(currentCell);
			takenCells.push(currentCell);

			// if new domain cell was found, add its neighbours
			// witch are not part of any domain to list of cells to check
			for (var n in offset) {
			    var offsetCell = [currentCell[0] + offset[n][0], currentCell[1] + offset[n][1]];
			    if (offsetCell[0] >= 0 && offsetCell[0] < height &&
				offsetCell[1] >= 0 && offsetCell[1] < width &&
				!isCellIn(offsetCell, takenCells) &&
				!isCellIn(offsetCell, neighbours)) {
				neighbours.push(offsetCell);
			    }
			}
		    }
		}
	    }

	    if (domain.length > 0) result.push(domain);
	}
    }

    return result;
};

function randomFill(height, width, probability) {
    var result = [];

    for (i = 0; i < height; i++) {
	result.push([]);
	for (j = 0; j < width; j++) {
	    result[i].push(Math.random() < probability ? 1 : 0);
	}
    }
    return result;
};

var matrix = [];
var width = 0;
var height = 0;

function parseDimentionsInput() {
    const maxSize = 40;
    const minSize = 3;
    var widthInput = document.getElementById("width");
    var heightInput = document.getElementById("height");
    
    width = parseFloat(widthInput.value);
    height = parseFloat(heightInput.value);

    if (isNaN(width)) {
	width = 3;
    }
    width = Math.min(40, Math.max(3, Math.floor(width)));
    
    if (isNaN(height)) {
	height = 3;
    }
    height = Math.min(40, Math.max(3, Math.floor(height)));

    if (widthInput.value != width || heightInput.value != height) {
	widthInput.value = width;
	heightInput.value = height;
	console.log("Wrong value");
    }

}

function createInputTable() {
    parseDimentionsInput();

    matrix = [];
    var tableElement = document.getElementById("input-table");
    var tableContents = "";

    for (i = 0; i < height; i++) {
	matrix.push([]);
	tableContents += "<tr>";
	for (j = 0; j < width; j++) {
	    matrix[i].push(0);
	    tableContents += "<td id=\"cell-" + i + "-" + j + "\" " +
		"onclick=\"switchCell(" + i + "," + j + ")\">0</td>";
	}
	tableContents += "</tr>";
    }
    tableElement.innerHTML = tableContents;
};

function switchCell(i, j) {
    var cell = document.getElementById("cell-" + i + "-" + j);
    matrix[i][j] = (matrix[i][j] == 0) ? 1 : 0;
    cell.innerHTML = matrix[i][j];
}

var colorPalete = ["#e52e2e",
		   "#e5b52e",
		   "#90e62e",
		   "#2ee696",
		   "#2eaee6",
		   "#342ee6",
		   "#bb2ee6",
		   "#e52e8a",
		   "#e5712e",
		   "#d3e62e",
		   "#4de62e",
		   "#2ee6d9",
		   "#2e6be6",
		   "#772ee6",
		   "#e62ecd",
		   "#e52e46"];

function clearColoring() {
    var cells = document.getElementById("input-table").getElementsByTagName("td");

    for (var i in cells) {
	cells[i].style = "";
    }
}

function countDomains() {
    clearColoring();
    var domains = getDomains(matrix);
    for (var i in domains) {
	for (var j in domains[i]) {
	    var cell = document.getElementById("cell-" + domains[i][j][0] + "-" + domains[i][j][1]);
	    cell.style = "background-color: " + colorPalete[i % colorPalete.length] + ";";
	}
    }
}

function fillTable() {
    for (var i in matrix) {
	for (var j in matrix[i]) {
	    var cell = document.getElementById("cell-" + i + "-" + j);
	    cell.innerHTML = matrix[i][j];
	}
    }
}

function parseProbabilityInput() {
    var input = document.getElementById("probability");

    var probability = parseFloat(input.value);

    if (isNaN(probability)) {
	probability = 0.1;
    }

    probability = Math.min(0.99, Math.max(0.01, probability));

    if (probability != input.value) {
	input.value = probability;
	console.log("Wrong probability");
    }
    return probability;
}

function fillTableRandomly() {
    var probability = parseProbabilityInput();

    createInputTable();
    matrix = randomFill(height, width, probability);
    fillTable();
    countDomains();
}
