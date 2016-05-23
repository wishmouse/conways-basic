(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var domready = require('domready')

domready(function () {

  var lib = require('./lib')
  var boardStarted = false
  var intervalID
  var board = lib.createBoard(50, 100)
  var root = "#root"
  var header = "#header"
  var heading = "Conway's Game of Life"

  renderHeading(heading, header)
  renderBoard()

  document.body.addEventListener('click', function (e) {
    var clickSource = e.srcElement.id

    if (clickSource === "start" && !boardStarted) {
      boardStarted = true
      intervalID = intervalTrigger()
    } else if (clickSource === "stop" && boardStarted) {
      boardStarted = false
      window.clearInterval(intervalID)
    } else if (clickSource === "step" & !boardStarted) {
        board = lib.nextBoard(board)
        renderBoard()
    } else if (e.srcElement.tagName === "TD") {
        var row = Number(clickSource.split("-")[0])
        var col = Number(clickSource.split("-")[1])
        board[row][col] = true
        renderBoard()


    }
  })

  function intervalTrigger() {
    return window.setInterval(function() {
      if (boardStarted){
        board = lib.nextBoard(board)
        renderBoard(board,root)
      }
    }, 100);
  };

  function renderHeading(headingText, element) {
    var heading = document.createElement('h1')
    heading.innerHTML = headingText
    root = document.querySelector(element)
    root.appendChild(heading)

    var subtitle = document.createElement('h3')
    subtitle.innerHTML = "(Click to start)"
    root.appendChild(subtitle)
  }

  function renderBoard() {
    var theRoot = document.querySelector("#root")
    theRoot.innerHTML = ""

    var table = document.createElement('table')

    for (var row = 0; row < board.length; row++) {
      var tableRow = document.createElement('tr')
      table.appendChild(tableRow)
      for (var col = 0; col < board[row].length; col++) {
        var tableCo = document.createElement('td')
        tableCo.id = row + "-" + col
        //tableCo.innerHTML = board[row][col]
        if (board[row][col]) tableCo.className = "filled"
        tableRow.appendChild(tableCo)

      }
    }
    theRoot.appendChild(table)
  }

})

},{"./lib":2,"domready":14}],2:[function(require,module,exports){
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

},{"./countAliveNeighbours":3,"./createBoard":4,"./displayBoard":5,"./nextBoard":8,"./nextCellState":9}],3:[function(require,module,exports){
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

},{"./getNeighbours":6}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
function displayBoard(board) {
  console.log(board)
  var ul = document.createElement('ul')
  document.body.appendChld(ul)
}
module.exports = displayBoard

},{}],6:[function(require,module,exports){
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

},{"./indicesOutOfBounds":7}],7:[function(require,module,exports){
var outOfBounds = require('./outOfBounds')

function indicesOutOfBounds(rowIndex, columnIndex, array) {

  var isRowOutOfBounds = outOfBounds(rowIndex,array)
  if(isRowOutOfBounds){
    return true
  }
  if(!isRowOutOfBounds){
    var isCollumOutOfBounds = outOfBounds(columnIndex,array[rowIndex]);
      if(isCollumOutOfBounds){
        return true
      }
  }
  return false
  /*
  var isRowOutOfBounds = outOfBounds(rowIndex,array)
  var isCollumOutOfBounds = outOfBounds(columnIndex,array);
  */
  return isRowOutOfBounds || isCollumOutOfBounds
}

module.exports = indicesOutOfBounds

},{"./outOfBounds":10}],8:[function(require,module,exports){
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

},{"./countAliveNeighbours":3,"./nextCellState":9}],9:[function(require,module,exports){
var overPopulated = require('./overPopulated')
var underPopulated = require('./underPopulated')
var ressurectable = require('./ressurectable')

function nextCellState(cellState, neighbourCount) {
  if (cellState) {
    if (underPopulated(neighbourCount) || overPopulated(neighbourCount)) {
      return false
    }
    return true
  } else {
    if (ressurectable(neighbourCount)) return true;
  }
  return false;

}


module.exports = nextCellState

},{"./overPopulated":11,"./ressurectable":12,"./underPopulated":13}],10:[function(require,module,exports){
function outOfBounds(index, array) {
 return ((index > array.length - 1) || (index < 0));
}
module.exports = outOfBounds

},{}],11:[function(require,module,exports){
function overPopulated(neighbourCount) {
  return neighbourCount > 3
}
module.exports = overPopulated

},{}],12:[function(require,module,exports){
function ressurectable(neighbourCount) {
  return neighbourCount === 3
}
module.exports = ressurectable

},{}],13:[function(require,module,exports){
function underPopulated(neighbourCount) {
  return neighbourCount <2
}
module.exports = underPopulated

},{}],14:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}]},{},[1]);
