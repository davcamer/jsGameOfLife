Simulation = function (aGridString) {
	var that = this;
	this.grid = Grid.parse(aGridString);	
	
		
	function calculateNextCellState() {
		applyToCell(function(cell){
			cell.calculateNextState();
			});
	};
	
	function updateCellState() {
		applyToCell(function(cell){
			cell.update(); 
		});
	};	
	
	function applyToCell(func){
		for(var rowNumber in grid.cells) {
			var row = grid.cells[rowNumber];
			for (var cellNumber in row){
				var cell = row[cellNumber];
				func(cell);
			}
		}
	};
		
	this.runGeneration = function () {
		calculateNextCellState();
		updateCellState();
	};
	
	this.display = function () {
		return that.grid.display();
	};
};