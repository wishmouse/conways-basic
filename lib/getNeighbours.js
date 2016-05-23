var indicesOutOfBounds = require('./indicesOutOfBounds')
function getNeighbours(cellRow, cellColumn, board) {
  //for the board, check if the cell row or column is out of bounds
  //then check if the neighbour is out of bounds
  //otherwise add the neighbour to the array and return it
  if(indicesOutOfBounds(cellRow, cellColumn, board)) return;

  var neighboursIndices = getNeighbourIndices(cellRow, cellColumn);

  var neighboursArray = [];
  for(var i in neighboursIndices){
    var row = neighboursIndices[i][0];
    var col = neighboursIndices[i][1];

    if(!indicesOutOfBounds(row,col,board)){
        neighboursArray.push(board[row][col])

    }

  }
  neighboursArray = neighboursArray.filter(function(x) {
    return x !== undefined
  })

  return neighboursArray;


}
module.exports = getNeighbours

function getNeighbourIndices (cellRow, cellColumn) {
  return [  [cellRow - 1, cellColumn - 1],
            [cellRow - 1, cellColumn],
            [cellRow - 1, cellColumn + 1],
            [cellRow, cellColumn + 1],
            [cellRow + 1, cellColumn + 1],
            [cellRow + 1, cellColumn],
            [cellRow + 1, cellColumn - 1],
            [cellRow, cellColumn - 1] ]
}
