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
