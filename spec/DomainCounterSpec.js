describe("getDomains", function() {
    
    it("should be defined function", function() {
	expect(getDomains).toBeDefined();
	expect(typeof getDomains).toEqual("function");
    });

    it("should return empty array on empty matrix", function() {
	expect(getDomains([])).toEqual([]);
    });

    it("should return empty array on matrix with sincle 0 cell", function() {
	expect(getDomains([[0]])).toEqual([]);
    });
    
    it("should return one dommain on matrix with sincle 1 cell", function() {
	expect(getDomains([[1]])).toEqual([[[0,0]]]);
    });

    it("should return all dommains on matrix with single cell sized dommains", function() {
	expect(getDomains([
	    [1, 0, 1, 0],
	    [0, 0, 0, 0],
	    [0, 0, 0, 0],
	    [0, 1, 0, 1]
	])).toEqual([
	    [[0,0]],
	    [[0,2]],
	    [[3,1]],
	    [[3,3]],
	]);
    });

    it("should return all dommains on matrix with multi-cell sized dommains", function() {
	expect(getDomains([
	    [1, 0, 1, 0],
	    [1, 1, 0, 0],
	    [0, 0, 0, 1],
	    [0, 1, 0, 1]
	])).toEqual([
	    [[0,0], [1,0], [1,1]],
	    [[0,2]],
	    [[2,3], [3,3]],
	    [[3,1]],
	]);
    });
});

describe("randomFill", function() {

    it("should be defined function", function() {
	expect(randomFill).toBeDefined();
	expect(typeof randomFill).toEqual("function");
    });

    it("should fill matrix with 0 given 0 probability", function() {
	expect(randomFill(3, 3, 0)).toEqual([[0,0,0],[0,0,0],[0,0,0]]);
    });

    it("should fill matrix with 1 given 1 probability", function() {
	expect(randomFill(3, 3, 1)).toEqual([[1,1,1],[1,1,1],[1,1,1]]);
    });

    it("should produce matrix with given distribution of 1s", function() {
	var totalOnes = 0;
	const dimentions = 40;
	const probability = 0.7;

	var result = randomFill(dimentions, dimentions, probability);
	for (var i in result) {
	    for (var j in result[i]) {
		if (result[i][j] === 1) {
		    totalOnes++;
		}
	    }
	}
	expect(totalOnes / (dimentions * dimentions)).toBeCloseTo(probability, 0.05);
    });
});
