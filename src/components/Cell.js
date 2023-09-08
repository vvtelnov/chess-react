import ChessPiece from "./ChessPiece";
import PossibleMoveMark from "./PossibleMoveMark";
import PossibleCaptureMark from "./PossibleCaptureMark";

export default function Cell(props) {
  const piece = props.cellPiece && props.cellPiece[0];
  const pieceColor = props.cellPiece && props.cellPiece[1];
  let cellClassName = `chess-board__cell chess-board__cell_color_${props.color}`
  if ( (props.kingsState[pieceColor] === 'checked') && (piece === 'king') ){
    cellClassName = 'chess-board__cell chess-board__cell_color_red'
  }

  return (
    <div
      className={cellClassName}
    >
      {props.isTheLeftColumn && 
        <span className="chess-board__cell_text_number">{props.rowNumb}</span>
      }
      {props.isTheBottomRow && 
        <span className="chess-board__cell_text_letter">{props.columnLetter}</span>
      }
      {props.cellPiece &&
        <ChessPiece
          color={pieceColor}
          pieceType={piece}
          onPieceClick={() => props.onPieceClick(props.cellId)}
        />
      }
      {props.isMovePossible &&
        <PossibleMoveMark onMovePieceBtnClick={() => props.onPieceMove(props.cellId)} />
      }
      {props.isCapturePossible &&
        <PossibleCaptureMark onCapturePieceBtnClick={() => props.onPieceCapture(props.cellId)} />
      }
    </div>
  )
}