function isTopRow(cellNumb) {
  if ((cellNumb >= 0) && (cellNumb <= 7)) {
    return true;
  }
  return false
}

function isBottomRow(cellNumb) {
  if ((cellNumb >= 56) && (cellNumb <= 63)) {
    return true;
  }
  return false
}

export { isTopRow, isBottomRow };