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
		return !(cellToLeftIsAlive(cell) && cellToRightIsAlive(cell));
	}
	
	function cellToLeftIsAlive(cell){
		var cellToLeft = that.cells[cell.row][cell.column-1];
		if(!cellToLeft){
			return false;
		}
		return cellToLeft.isAlive();
	}
	
	function cellToRightIsAlive(cell){
		var cellToRight = that.cells[cell.row][cell.column+1];
		if(!cellToRight){
			return false;
		}
		return cellToRight.isAlive();
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