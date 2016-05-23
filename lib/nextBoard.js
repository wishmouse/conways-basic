var nextCellState = require('./nextCellState')
var countAliveNeighbours = require('./countAliveNeighbours')

function nextBoard(currentBoard) {
  var newBoard = [];
  for(var row = 0; row < currentBoard.length; row++){
    newBoard[row] = [];
    for(var col = 0; col < currentBoard[row].length;col++){
      var currentCell = currentBoard[row][col]
      var newState = nextCellState(currentCell,countAliveNeighbours(row,col,currentBoard));
      newBoard[row][col] = newState;
    }
  }
return newBoard;
}

module.exports = nextBoard
