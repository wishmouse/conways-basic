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
