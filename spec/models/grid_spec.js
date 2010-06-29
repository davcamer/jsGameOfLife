Screw.Unit(function() {
  describe('Grid', function() {
	it("should parse string to array of cells", function() {
		var grid = Grid.parse('--:' +
					   	 	  '-+');
		expect(grid.display()).to(equal, '--:' +
								       	 '-+');
	});
	
	it("should create a clone", function() {
		var originalGrid = Grid.parse('--:' +
		                              '--');
		var clonedGrid = originalGrid.clone();
		
		expect(clonedGrid !== originalGrid).to(equal, true);
		expect(clonedGrid.cells !== originalGrid.cells).to(equal, true);  
	});
  });
});