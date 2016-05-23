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
