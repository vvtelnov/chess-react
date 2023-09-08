export default function PossibleMoveMark(props) {
  return (
    <button
      className="chess-board__cell-moveBtn"
      onClick={props.onMovePieceBtnClick}
    />
  )
}