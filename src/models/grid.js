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
				if(shouldCellLive(row[colNumber])) {
					newGrid.cells[rowNumber][colNumber] = new Cell(new Number(rowNumber), new Number(colNumber), '+', newGrid);
				} else {
					newGrid.cells[rowNumber][colNumber] = new Cell(new Number(rowNumber), new Number(colNumber), '-', newGrid);
				}
			}
		}
		return newGrid;
	}
	
	function shouldCellLive(cell) {
		var countOfLiveCells = neighbourIsLive(cell, -1, -1);
	    countOfLiveCells += neighbourIsLive(cell, -1, 0);
	    countOfLiveCells += neighbourIsLive(cell, 0, -1);
		countOfLiveCells += neighbourIsLive(cell, -1, +1);
		countOfLiveCells += neighbourIsLive(cell, +1, 0);
		countOfLiveCells += neighbourIsLive(cell, +1, +1);
		countOfLiveCells += neighbourIsLive(cell, 0, +1);
		countOfLiveCells += neighbourIsLive(cell, +1, -1);
		return countOfLiveCells >= 2 && cell.isAlive();
	}
	
	function neighbourIsLive(cell, xDelta, yDelta){
		var neighbourRow = that.cells[cell.row + yDelta];
		
		if(!neighbourRow){
			return 0;
		}
		
		var neighbourCell = neighbourRow[cell.column + xDelta];
		if(!neighbourCell){
			return 0;
		}
		return neighbourCell.isAlive() ? 1 : 0;
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