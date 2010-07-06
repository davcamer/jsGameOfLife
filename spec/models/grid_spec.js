Screw.Unit(function() {
  describe('Grid', function() {
	it("should parse string to array of cells", function() {
		var grid = Grid.parse('--:' +
					   	 	  '-+');
		expect(grid.display()).to(equal, '--:' +
								       	 '-+');
	});
	
	it("should kill active cells when they have no live neighbors", function() {
		var grid = Grid.parse('+-:' +
				 	 		  '--');
		var nextGrid = grid.nextGrid();
		
		expect(nextGrid.display()).to(equal, '--:' +
								             '--');
	});
	
	it("should keep cell alive with two live neighbours", function() {
		var grid = Grid.parse('+--:' +
				 	 		  '-+-:' +
							  '--+');
		var nextGrid = grid.nextGrid();
	
		expect(nextGrid.display()).to(equal, '---:' +
								             '-+-:' +
											 '---');
	});
	
	it("should keep cell alive with three live neighbours", function() {
		var grid = Grid.parse('+-+:' +
				 	 		  '-+-:' +
							  '--+');
		var nextGrid = grid.nextGrid();
	
		expect(nextGrid.display()).to(equal, '-+-:' +
								             '-++:' +
											 '---');
	});
	
	it("should kill cell with more than three live neighbours", function() {
		var grid = Grid.parse('+-+:' +
				 	 		  '-+-:' +
							  '+-+');
		var nextGrid = grid.nextGrid();
	
		expect(nextGrid.display()).to(equal, '-+-:' +
								             '+-+:' +
											 '-+-');
	});
	
	it("should regenerate cell with three live neighbours", function() {
		var grid = Grid.parse('+-+:' +
				 	 		  '---:' +
							  '+--');
		var nextGrid = grid.nextGrid();
	
		expect(nextGrid.display()).to(equal, '---:' +
								             '-+-:' +
											 '---');
	});
  });
});