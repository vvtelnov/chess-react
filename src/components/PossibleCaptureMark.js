export default function PossibleCaptureMark(props) {
  return (
    <button
      className="chess-board__cell-captureBtn"
      onClick={props.onCapturePieceBtnClick}
    />
  )
}