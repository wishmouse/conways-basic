var getNeighbours = require('./getNeighbours')
function countAliveNeighbours(cellRow, cellColumn, board) {
var count = 0;
var neighbours = getNeighbours(cellRow,cellColumn,board)

  for(var alive in neighbours){
    if(neighbours[alive]){
      count++
    }
  }
  return count;
}
module.exports = countAliveNeighbours
