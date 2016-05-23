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
