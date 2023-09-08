export default class GeneralPiece {
  constructor(color, type) {
    this.color = color;
    this.type = type;
  }

  _isCellTaken(cellNubm) {
    if (Array.isArray(this.allPiecesPosition[cellNubm])) {
      return true;
    }
    return false;
  }

  _updateAllPositions(position, allPiecesPosition) {
    this.position = position;
    this.allPiecesPosition = allPiecesPosition;
  }

  _isTheLeftColumn(cellNumb) {
    return cellNumb % 8 === 0 ? true : false
  }

  _isTheRightColumn(cellNumb) {
    return cellNumb % 8 === 7 ? true : false
  }

  _isTheTopRow(cellNumb) {
    return (cellNumb >= 0 && cellNumb <= 7) ? true : false
  }

  _isTheBottomRow(cellNumb) {
    return cellNumb >= 56 ? true : false
  }

  _isTheFarCell(cellNumb) {
    return (
      this._isTheLeftColumn(cellNumb) ||
      this._isTheRightColumn(cellNumb) ||
      this._isTheTopRow(cellNumb) ||
      this._isTheBottomRow(cellNumb)
    )
  }

  _isCellTakenByPassedColor(cellNubm) {
    if (this.allPiecesPosition[cellNubm][1] === this.color) {
      return true;
    }
    return false;
  }
}