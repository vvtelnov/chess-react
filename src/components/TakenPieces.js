export default function TakenPieces(props) {
  // these arr use to iterate on them
  // this arr shows how pieses should appear
  // these arr should look like this, if every type of piece is captured
  const pieceOrder = ['queen', 'rook', 'bishop', 'knight', 'pawn'];
  const allColors = ['white', 'black'];


  return (
    <div className="taken-pieces">
      {/* firs loop - two iteration each for black and white pieces  */}
      {allColors.map((color, i) => (
        // this <div> container for displaing white and black pieces in two diff rows
        <div className="taken-pieces__color-container" key={i}>
          {pieceOrder.map((jPiece, j) => (
            // using passed prop takenPieces to get a numb of each type of piece, iterate on it and add exact numb of pieces to container
            // style={{width: 30 + props.takenPieces[color][jPiece] * 10}} - that supposed to set width dinamically depending on amounght of pieces specified type
            props.takenPieces[color][jPiece] > 0 && (
              <div className="taken-pieces__type-container" key={j} style={{width: 30 + props.takenPieces[color][jPiece] * 10}}>
                {Array.from(Array(props.takenPieces[color][jPiece]).keys()).map(k => (
                  <img
                    key={k}
                    // style={{left: k * 10}} to implement efect of "partly hovering one pieces of other"
                    style={{left: k * 10}}
                    className="taken-pieces__piece"
                    src={require(
                        `/Users/vladimir/Documents/web-frontend_projects/chess-react/src/images/chess_pieces/${jPiece}_${color}.png`
                      )}
                    alt={`${color} ${jPiece}`}
                  />
                ))}
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  )
}          