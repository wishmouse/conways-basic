function createBoard(height, width) {
  var board = [];

  for(var row=0; row < height; row++){
    board[row] = []
    for(var col = 0; col <width; col++){

      board[row][col] = random()
    }
  }
  return board
}

module.exports = createBoard

function random(){
  if (Math.floor(Math.random() * 10) == 0) {
    return true
  }
  return false
}
