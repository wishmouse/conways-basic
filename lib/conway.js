var countAliveNeighbours = require('./countAliveNeighbours')
var nextCellState = require('./nextCellState')
var createBoard = require('./createBoard')
var nextBoard = require('./nextBoard')
var displayBoard = require('./displayBoard')
/*
var board = createBoard(10)
board[3][4] = true
board[3][3] = true
board[4][3] = true
board[5][3] = true
board[6][5] = true

displayBoard(board)
console.log('\n')

setInterval(function(){
  board = nextBoard(board)
  displayBoard(board)
  console.log('\n')
}, 1)
*/
exports.createBoard = createBoard
exports.nextBoard = nextBoard
