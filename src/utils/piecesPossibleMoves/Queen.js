import Bishop from "./Bishop";

export default class Queen extends Bishop {
  constructor(color, type) {
    super(color, type);
    // [-8, 1, 8, -1] - these numbs are how many we should add to curr position to get to closest horizontal or vertical cell
    // The values in movesDirections object is methods checking is currPos on the chess board is cell at the edge of the board
    this._movesDirections[-8] = currPos => (this._isTheTopRow(currPos)); // going up
    this._movesDirections[1] = currPos => (this._isTheRightColumn(currPos)); //going right
    this._movesDirections[8] = currPos => (this._isTheBottomRow(currPos)); //goint down
    this._movesDirections[-1] = currPos => (this._isTheLeftColumn(currPos)); //going left
  }
}