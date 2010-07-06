Grid = function() {
	var that = this;
	that.cells = [];
	
	this.display = function () {
		var lines = [];
		for (rownumber in that.cells) {
			var row = that.cells[rownumber];
			
			var line = "";
			for(colNumber in row) {
				line += (row[colNumber].toString());
			}
			lines.push(line);
		}
		return lines.join(":");
	};
	
	this.nextGrid = function() {
		var newGrid = new Grid();
		for (rowNumber in that.cells) {
			var row = that.cells[rowNumber];
			newGrid.cells[rowNumber] = [];
			
			for(colNumber in row) {
				if(shouldCellDie(row[colNumber])) {
					newGrid.cells[rowNumber][colNumber] = new Cell(new Number(rowNumber), new Number(colNumber), '-', newGrid);
				} else {
					newGrid.cells[rowNumber][colNumber] = new Cell(new Number(rowNumber), new Number(colNumber), '+', newGrid);
				}
			}
		}
		return newGrid;
	}
	
	function shouldCellDie(cell) {
		var doesNotHaveTwoHorizontalNeighbours = !(neighbourIsLive(cell, -1, 0) && neighbourIsLive(cell, +1, 0));
		var doesNotHaveTwoVerticalNeighbours = !(neighbourIsLive(cell, 0, -1) && neighbourIsLive(cell, 0, +1));
		var doesNotHaveTwoDiagonalNeighbours = !(neighbourIsLive(cell, -1, -1) && neighbourIsLive(cell, +1, +1));
		
		return doesNotHaveTwoHorizontalNeighbours && doesNotHaveTwoVerticalNeighbours && doesNotHaveTwoDiagonalNeighbours;
	}
	
	function neighbourIsLive(cell, xDelta, yDelta){
		var neighbourRow = that.cells[cell.row + yDelta];
		
		if(!neighbourRow){
			return false;
		}
		
		var neighbourCell = neighbourRow[cell.column + xDelta];
		if(!neighbourCell){
			return false;
		}
		return neighbourCell.isAlive();
	}
};

Grid.parse = function(aGridString) {
	var grid = new Grid();
	var rowStrings = aGridString.split(':');

	for(var rowNumber in rowStrings) {
		var cellStrings = rowStrings[rowNumber].split('');
		var row = [];
		for(var colNumber in cellStrings) {
			row.push(new Cell(new Number(rowNumber), new Number(colNumber), cellStrings[colNumber], grid));
		}

		grid.cells[rowNumber] = row; 
	}
	
	return grid;
};