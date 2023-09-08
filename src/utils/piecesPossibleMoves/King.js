import Bishop from "./Bishop";
import allPieces from "../allInstPiecesLogic";

export default class King extends Bishop {
  constructor(color, type) {
    super(color, type);
    this._canGoFurterThanOneOneCell = false;
    // [-8, 1, 8, -1] - these numbs are how many we should add to curr position to get to closest horizontal or vertical cell
    // The values in movesDirections object is methods checking is currPos on the chess board is cell at the edge of the board
    this._movesDirections[-8] = currPos => (this._isTheTopRow(currPos)); // going up
    this._movesDirections[1] = currPos => (this._isTheRightColumn(currPos)); //going right
    this._movesDirections[8] = currPos => (this._isTheBottomRow(currPos)); //goint down
    this._movesDirections[-1] = currPos => (this._isTheLeftColumn(currPos)); //going left

    // except King
    this._allPiecesOppositeColorOnTheBoard = []
    this.checkedOrMatedState = {
      checked: false,
      mated: false,
    }
  }

  getPossiblesMovesSells(position, allPiecesPosition) {
    this._updateAllPositions(position, allPiecesPosition);
    this._updatePossiblesTurns();
    return this.canDo;
  }

  isCheckedOrMated(kingPosition, allPiecesPosition) {
    this.getPossiblesMovesSells(kingPosition, allPiecesPosition);
    this._updateCheckedOrMatedState(kingPosition, allPiecesPosition);
    if (this.checkedOrMatedState.mated) {
      return 'mated';
    } else if (this.checkedOrMatedState.checked) {
      return 'checked';
    }
    return false;
  }

  // using super method only
  _super_GetPossiblesMovesSells(position, allPiecesPosition) {
    // console.log('super method called')
    this._updateAllPositions(position, allPiecesPosition);
    super._updatePossiblesTurns();
    return this.canDo;
  }

  _updatePossiblesTurns() {
    super._updatePossiblesTurns();
    this.canDo.moves = this._getNotCheckedKingMoves(this.canDo.moves, this.allPiecesPosition);
    this.canDo.captures = this._getNotCheckedKingCaptures(this.canDo.captures, this.allPiecesPosition);
  }

  _updateCheckedOrMatedState(kingPos, allPiecesPosition) {
    this.checkedOrMatedState.checked = this._isChecked(kingPos, allPiecesPosition);
    this.checkedOrMatedState.mated = this._isMated();
    return this.checkedOrMatedState;
  }

  _isChecked(kingPos, allPiecesPosition) {
    let isChecked = false;
    Object.keys(allPiecesPosition).forEach(iCell => {
      if (allPiecesPosition[iCell]) {
        const iPiece = allPiecesPosition[iCell][0];
        const iColor = allPiecesPosition[iCell][1];
        if (iColor !== this.color) {
          if (iPiece === 'king') {
            const isKingCheckingKing = allPieces.king[iColor]
              ._super_GetPossiblesMovesSells(iCell, allPiecesPosition)
              .captures
              .includes(kingPos);
            if (isKingCheckingKing) {
              isChecked = true;
            }
          } else {
            const isPieceCheckingKing = allPieces[iPiece][iColor]
              .getPossiblesMovesSells(iCell, allPiecesPosition)
              .captures
              .includes(kingPos);
            if (isPieceCheckingKing) {
              isChecked = true;
            }
          }
        }
      }
    })
    return isChecked;
  }

  _isMated() {
    console.log(this.color, this.canDo)
    if (this.checkedOrMatedState.checked) {
      if ( (this.canDo.moves.length === 0) && (this.canDo.captures.length === 0) ) {
        console.log('is mated');
        return true;
      }
    }
    return false;
  }
  
  _getNotCheckedKingMoves(kingMoves, allPiecesPosition) {
    const notCheckedKingMoves = [];
    const allPiecesPossibleMoves = []
    const allPiecesPositionWithoutKing = {
      ...allPiecesPosition,
      [this.position]: null,
    };

    Object.keys(allPiecesPositionWithoutKing).forEach(jCell => {
      jCell = Number(jCell)
      if (allPiecesPositionWithoutKing[jCell]) {
        const jPiece = allPiecesPositionWithoutKing[jCell][0];
        const jColor = allPiecesPositionWithoutKing[jCell][1];
        if (jColor !== this.color) {
          if (jPiece === 'king') {
            // calling parent method on king to avoid checking for checks for other king 
            const iPiecePosibleMoves = allPieces[jPiece][jColor]
              ._super_GetPossiblesMovesSells(jCell, allPiecesPositionWithoutKing).moves;
              allPiecesPossibleMoves.push(...iPiecePosibleMoves);
          } else if (jPiece === 'pawn') {
            const iPawnPosibleMoves = allPieces[jPiece][jColor]
            .getPossiblesMovesSells(jCell, allPiecesPositionWithoutKing).moves;
            const iPawnPosibleCaptures = [];
            if (this._isTheLeftColumn(jCell)) {
              // taking right cell
              iPawnPosibleCaptures.push(iPawnPosibleMoves[0] + 1);
            } else if (this._isTheRightColumn(jCell)) {
              // taking left cell
              iPawnPosibleCaptures.push(iPawnPosibleMoves[0] - 1);
            } else {
              // taking right and left cell
              iPawnPosibleCaptures.push(iPawnPosibleMoves[0] + 1);
              iPawnPosibleCaptures.push(iPawnPosibleMoves[0] - 1);
            }
            allPiecesPossibleMoves.push(...iPawnPosibleCaptures);
          } else {
            // All others pieces
            const iPiecePosibleMoves = allPieces[jPiece][jColor]
            .getPossiblesMovesSells(jCell, allPiecesPositionWithoutKing).moves;
            allPiecesPossibleMoves.push(...iPiecePosibleMoves);
          }
        }
      }
    })
    // update not checked cells (where king can go)
    kingMoves.forEach(iMove => {
      if (!allPiecesPossibleMoves.includes(iMove)) {
        notCheckedKingMoves.push(iMove);
      }
    })

    return notCheckedKingMoves;
  }

  _getNotCheckedKingCaptures(kingCaptures, allPiecesPosition) {
    const notCheckedKingCaptures = [];
    // for each kingCaptures modeling situation where king did capcture to see would it be checked
    kingCaptures.forEach(iCapture => {
      const newAllPiecesPosition = {
        ...allPiecesPosition,
        [this.position]: null,
        [iCapture]: ['king', this.color],
      };
      if (!this._isChecked(iCapture, newAllPiecesPosition)) {
        notCheckedKingCaptures.push(iCapture)
      }
    }) 
    return notCheckedKingCaptures;
  }
}