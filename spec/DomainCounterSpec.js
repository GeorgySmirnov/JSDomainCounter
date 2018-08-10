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

    it("should return all dommains on matrix with 1 cell sized dommains", function() {
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
});
