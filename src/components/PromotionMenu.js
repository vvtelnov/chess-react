export default function PromotionMenu(props) {
  // accept folowing props: 
  // props.piecesColor - is used to fill the menu with picese corresponding color
  // props.cell - used to position popup
  const pieces = ['queen', 'rook', 'bishop', 'knight'];

  let side;
  if ( (props.cell < 4) || (props.cell >= 56 && props.cell < 60) ) {
    side = 'left';
  } else {
    side = 'right';
  }
  
  // popup positions for each cell. keys is cell numbs
  const leftShiftPosition = {
    0: -237.5,
    1: -137.5,
    2: -37.5,
    3: 62.5,
    4: -70,
    5: 30,
    6: 130,
    7: 230,
    56: -237.5,
    57: -137.5,
    58: -37.5,
    59: 62.5,
    60: -70,
    61: 30,
    62: 130,
    63: 230,
  }[props.cell]

  const promotionMenuClassName = `
    promotion-menu 
    promotion-menu_piece-color_${props.piecesColor} 
    promotion-menu_arrow-side_${side}
  `
  return (
    <div
      className={promotionMenuClassName}
      style={{left: leftShiftPosition}}
    >
      {pieces.map((iPiece, i) => (
        <img
          key={i}
          className="promotion-menu__chess-piece"
          onClick={() => props.onPromotionPieceClick(iPiece, props.piecesColor)}
          src={require(
              `/Users/vladimir/Documents/web-frontend_projects/chess-react/src/images/chess_pieces/${iPiece}_${props.piecesColor}.png`
            )}
          alt={`${iPiece} ${props.piecesColor}`}
        />
      ))}
    </div>
  )
}