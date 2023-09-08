import Bishop from "./Bishop";

export default class Knight extends Bishop {
  constructor(color, type) {
    super(color, type);
    
    // [-8, 1, 8, -1] - these numbs are how many we should add to curr position to get to closest horizontal or vertical cell
    // The values in movesDirections object is methods checking is currPos on the chess board is cell at the edge of the board

    this._movesDirections = {
      up: [
        currPos => !this._isTheTopRow(currPos - 8), 
        currPos => !this._isTheTopRow(currPos), 
        currPos => !this._isTheLeftColumn(currPos - 16),
        currPos => !this._isTheRightColumn(currPos - 16),
      ],
      right: [
        currPos => !this._isTheRightColumn(currPos + 1),
        currPos => !this._isTheRightColumn(currPos),
        currPos => !this._isTheTopRow(currPos + 2),
        currPos => !this._isTheBottomRow(currPos + 2),
      ],
      down: [
        currPos => !this._isTheBottomRow(currPos + 8),
        currPos => !this._isTheBottomRow(currPos),
        currPos => !this._isTheLeftColumn(currPos + 16),
        currPos => !this._isTheRightColumn(currPos + 16),
      ],
      left: [
        currPos => !this._isTheLeftColumn(currPos - 1),
        currPos => !this._isTheLeftColumn(currPos),
        currPos => !this._isTheTopRow(currPos - 2),
        currPos => !this._isTheBottomRow(currPos - 2),
      ],
    }

    this._movesDirectionsCellsInstructons = {
      up: [-17, -15],
      right: [-6, 10],
      down: [15, 17],
      left: [-10, 6],
    }
  }

  _updatePossiblesTurns() {
    // empting the canDo arr
    this.canDo = {
      moves: [],
      captures: [],
    }

    // theoreticallyCanMoveTo - arr of theoretically possible moves (if no pieces on the chess board).
    const theoreticallyCanMoveTo = [];
    let currPos = this.position;

    // 4 iteration
    Object.keys(this._movesDirections).forEach(iDirection => {
      if (this._movesDirections[iDirection][0](currPos) && this._movesDirections[iDirection][1](currPos)) {
        if (this._movesDirections[iDirection][2](currPos)) {
          const nextPos = Number(currPos) + Number(this._movesDirectionsCellsInstructons[iDirection][0]);
          theoreticallyCanMoveTo.push(nextPos);
        }
        if (this._movesDirections[iDirection][3](currPos)) {
          const nextPos = Number(currPos) + Number(this._movesDirectionsCellsInstructons[iDirection][1]);
          theoreticallyCanMoveTo.push(nextPos);
        }
      }
    });

    theoreticallyCanMoveTo.forEach(iMoveCell => {
      if (this._isCellTaken(iMoveCell)) {
        if (!this._isCellTakenByPassedColor(iMoveCell)) {
          this.canDo.captures.push(iMoveCell);
        }
      } else {
        this.canDo.moves.push(iMoveCell);
      }
    })
  }
}


