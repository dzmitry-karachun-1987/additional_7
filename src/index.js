module.exports = function solveSudoku(matrix) {
    var emptyPositions = saveEmptyPositions(matrix);
	
	return solvePuzzle(matrix, emptyPositions);
}

function solvePuzzle(matrix, emptyPositions) {
	var row;
	var column;
	var value;
	var found;
	
	for (var i = 0; i < emptyPositions.length;) {
		row = emptyPositions[i][0];
		column = emptyPositions[i][1];
		value = matrix[row][column] + 1;	
		found = false;
		
		while (!found && value <= 9) {
			if (checkValue(matrix, column, row, value)) {
				found = true;
				matrix[row][column] = value;
				i++;
			}
			else
				value++;
		}
		
		if (!found) {
			matrix[row][column] = 0;
			i--;
		}
	}

	return matrix;
}

function checkValue(matrix, column, row, value) {
	if (checkRow(matrix, row, value) &&
	   checkColumn(matrix, column, value) &&
	   check3x3Square(matrix, column, row, value)) {
		return true;
	} else
		return false;
}

function check3x3Square(matrix, column, row, value) {
	var rowCorner = 0;
	var columnCorner = 0;
	var squareSize = 3;

	while (column >= columnCorner + squareSize)
		columnCorner += squareSize;

	while (row >= rowCorner + squareSize)
		rowCorner += squareSize;

	for (var i = rowCorner; i < rowCorner + squareSize; i++)
		for (var j = columnCorner; j < columnCorner + squareSize; j++)
			if(matrix[i][j] === value)      
				return false;
	
	return true;
}

function checkColumn(matrix, column, value) {
	for (var i = 0; i < matrix.length; i++)
		if (matrix[i][column] === value)
			return false;
	
	return true;
}

function checkRow(matrix, row, value) {
	for (var i = 0; i < matrix[row].length; i++)
		if (matrix[row][i] === value)
			return false;
	
	return true;
}

function saveEmptyPositions(matrix) {
	var emptyPositions = [];

	for (var i = 0; i < matrix.length; i++)
		for (var j = 0; j < matrix[i].length; j++)
			if (matrix[i][j] === 0)
				emptyPositions.push([i, j]);

return emptyPositions;
}