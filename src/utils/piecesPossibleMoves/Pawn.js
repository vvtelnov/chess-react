import GeneralPiece from "./GeneralPiece";

class Pawn extends GeneralPiece {
  constructor(color, type) {
    super(color, type);
    this.canDo = {
      moves: [],
      captures: [],
    }
  }

  getPossiblesMovesSells(position, allPiecesPosition) {
    this._updateAllPositions(position, allPiecesPosition);
    this._updatePawnPossiblesTurns();
    return this.canDo;
  }

  _updatePawnPossiblesTurns() {
    // gives us this.isInInitPosition
    this._isPawnInInitPosition();
    // gives us this._oneSellMovePositionNumb and this._twoSellMovePositionNumb
    // moves were pawn could go if on the board would be no other pieces
    this._theoreticallyCanMoveTo();
    // upd this.canDo
    this.canDo.moves = this._canMoveTo();
    this._canCapture();
  }

  _theoreticallyCanMoveTo() {
    this._isInInitPosition = this._isPawnInInitPosition();
    this._oneSellMovePositionNumb = (this.color === 'black' ? this.position + 8 : this.position - 8);
    this._twoSellMovePositionNumb = (this.color === 'black' ? this.position + 16 : this.position - 16);
    // if pawn is in a left o right col, _theoreticallyCanCapture arr contains only one cellNumb
    if (this._isTheLeftColumn(this.position)) {
      this._theoreticallyCanCapture = [this._oneSellMovePositionNumb + 1];
    } else if (this._isTheRightColumn(this.position)) {
      this._theoreticallyCanCapture = [this._oneSellMovePositionNumb - 1];
    } else {
      this._theoreticallyCanCapture = [this._oneSellMovePositionNumb - 1, this._oneSellMovePositionNumb + 1];
    }
  }

  _isPawnInInitPosition() {
    if (this.color === 'black') {
      if ( (this.position >= 8) && (this.position <= 15) ) {
        return true
      }
    } else {
      if ( (this.position >= 48) && (this.position <= 55) ) {
        return true
      }
    }
    return false
  }

  _canMoveTo() {
    //Returns arr:
    // [] - the pass is blocked, cant move
    // [ 'with one int' ] - can move to one cell forward
    // [ 'with two ints' ] - can move two cells forward
    if (this._isCellTaken(this._oneSellMovePositionNumb)) {
      return [];
    } else if (this._isInInitPosition && !this._isCellTaken(this._twoSellMovePositionNumb)) {
      return [this._oneSellMovePositionNumb, this._twoSellMovePositionNumb];
    }
    return [this._oneSellMovePositionNumb];
  }

  _canCapture() {
    // if pawn can capture upd arr this.canDo.capturess elsewise set it to empty arr
    this.canDo.captures = [];
    // if (this._isInInitPosition) {
    //   should be logic for taking on the passage
    // }
    this._theoreticallyCanCapture.forEach(iCell => {
        if (this._isCellTaken(iCell) && !this._isCellTakenByPassedColor(iCell)) {
          this.canDo.captures.push(iCell);
        }
      })
  }
}

export default Pawn;