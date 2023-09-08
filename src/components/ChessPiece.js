function ChessPiece(props) {
  return (
    <img
      className="chess-piece"
      onClick={props.onPieceClick}
      src={require(
          `/Users/vladimir/Documents/web-frontend_projects/chess-react/src/images/chess_pieces/${props.pieceType}_${props.color}.png`
        )}
      alt={`${props.color} ${props.pieceType}`}
    />
  )
}

export default ChessPiece;