Cell = function(row, column, state, grid) {
	var that = this;
	var neighbours = [];
	this.state = state;
	this.nextState = '';
	this.row = row;
	this.column = column;
	
	this.toString = function() {
		return state;
	};
	
	this.update = function() {
		state = that.nextState;
	};
		
	this.isAlive = function() {
		return state === '+';
	};
	
	function getCellState(row, otherColumn){
		var otherCell = grid[row][otherColumn];
		if(otherCell == undefined){
			return '-';
		}
		return grid[row][otherColumn].state;
	};
};