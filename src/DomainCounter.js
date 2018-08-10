function getDomains (matrix) {
    if (matrix === []) {
	return [];
    }
    var height = matrix.length || 0;
    var width = (height > 0) ? (matrix[0].length || 0) : 0;
    var result = [];

    for (i = 0; i < height; i++) {
	for (j = 0; j < width; j++) {
	    if (matrix[i][j] == 1) {
		result.push([[i,j]]);
	    }
	}
    }

    return result;
};
