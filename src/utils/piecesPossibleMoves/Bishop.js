import GeneralPiece from "./GeneralPiece";

class Bishop extends GeneralPiece {
  constructor(color, type) {
    super(color, type);
    this._canGoFurterThanOneOneCell = true;
    this.canDo = {
      moves: [],
      captures: [],
    }
    // [-9, -7, 9, 7] - these numbs are how many we should add to curr position to get to closest diagonal cell
    // The values in movesDirections object is methods checking is currPos on the chess board is cell at the edge of the board
    this._movesDirections = {
      [-9]: currPos => (this._isTheLeftColumn(currPos) || this._isTheTopRow(currPos)),  //going up and left
      [-7]: currPos => (this._isTheRightColumn(currPos) || this._isTheTopRow(currPos)), //going up and right
      9: currPos => (this._isTheRightColumn(currPos) || this._isTheBottomRow(currPos)), //going down and right
      7: currPos => (this._isTheLeftColumn(currPos) || this._isTheBottomRow(currPos)), //going down and left
    }
  }

  getPossiblesMovesSells(position, allPiecesPosition) {
    this._updateAllPositions(position, allPiecesPosition);
    // this._updatePossiblesTurns upds this.canDo.moves and this.canDo.captures
    this._updatePossiblesTurns();
    return this.canDo;
  }

  _updatePossiblesTurns() {
    // empting the canDo arr
    this.canDo = {
      moves: [],
      captures: [],
    }
    // iterating trought all four diagonales to find posible moves and captures
    Object.keys(this._movesDirections).forEach(iShift => {
      // iShift is the numb describing how many we should add to curr position to get to closest diagonal cell in the selected direction
      let currPos = this.position;
      // console.log(this.type, this.color, currPos)
      // nextPos is calculated with currPos + iShift 
      let nextPos;
      //callculating all posible moves and captures in one diagonales 
      while (true) {
        nextPos = Number(currPos) + Number(iShift);
        if ( this._movesDirections[iShift](currPos) ) {
          // chessbord ends, cant go further in this direction => break
          break;
        } else if (this._isCellTaken(nextPos)) {
          if (!this._isCellTakenByPassedColor(nextPos)) {
            this.canDo.captures.push(nextPos)
          }
          // the pass is block by the same color, can't go further in this direction => break
          break;
        }
        this.canDo.moves.push(nextPos);
        currPos = nextPos;
        
        if (!this._canGoFurterThanOneOneCell) {
          // that meens this is a king
          break
        }
      }
    })
  }
}

export default Bishop;