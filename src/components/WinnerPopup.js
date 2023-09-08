export default function WinnerPopup(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="popup">
      <div className="winner-popup">
        <img
          className="winner-popup__image"
          src={require(
            `/Users/vladimir/Documents/web-frontend_projects/chess-react/src/images/chess_pieces/knight_${props.winnerColor}.png`
            )}
          alt={`${props.winnerColor} pawn`}
        />
        <h3 className="winner-popup__title">
          <span>{capitalizeFirstLetter(props.winnerColor)}</span>{' has won!'}
        </h3>
        <button className="winner-popup__btn" onClick={props.onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  )
}