import { useState, useEffect, useRef } from 'react'
import Cell from './Cell'
import TakenPieces from './TakenPieces';
import PromotionMenu from './PromotionMenu';
import WinnerPopup from './WinnerPopup';
import ChessNotation from './ChessNotation';
import allPiecesLogic from '../utils/allInstPiecesLogic';
import { isTopRow, isBottomRow } from '../utils/isTopOrBottomRow';
import chessNotationLogic from '../utils/chessNotationLogic';

const letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']; 

export default function ChessBoard() {
  const [boardPlacement, setBoardPlacement] = useState({
    0: ['rook', 'black',],
    1: ['knight', 'black'],
    2: ['bishop', 'black'],
    3: ['queen', 'black'],
    4: ['king', 'black'],
    5: ['bishop', 'black'],
    6: ['knight', 'black'],
    7: ['rook', 'black'],
    8: ['pawn', 'black'],
    9: ['pawn', 'black'],
    10: ['pawn', 'black'],
    11: ['pawn', 'black'],
    12: ['pawn', 'black'],
    13: ['pawn', 'black'],
    14: ['pawn', 'black'],
    15: ['pawn', 'black'],

    48: ['pawn', 'white'],
    49: ['pawn', 'white'],
    50: ['pawn', 'white'],
    51: ['pawn', 'white'],
    52: ['pawn', 'white'],
    53: ['pawn', 'white'],
    54: ['pawn', 'white'],
    55: ['pawn', 'white'],
    56: ['rook', 'white'],
    57: ['knight', 'white'],
    58: ['bishop', 'white'],
    59: ['queen', 'white'],
    60: ['king', 'white'],
    61: ['bishop', 'white'],
    62: ['knight', 'white'],
    63: ['rook', 'white'],
  })

  const [activePiece, setActivePiece] = useState({
    piece: [], //[piece, pieceColor]
    pieceInitPos: '',
    moves: [],
    captures: [],
  })

  const [kingsState, setKingsState] = useState({
    white: false,
    black: false,
  })

  const [kingsPos, setKingsPos] = useState({
    white: 60,
    black: 4,
  })

  //  if piece is capured, maching obj property should be increased by one
  const [takenPieces, setTakenPieces] = useState({
    white: {
      rook: 0,
      knight: 0,
      bishop: 0,
      queen: 0,
      pawn: 0,
    },
    black: {
      rook: 0,
      knight: 0,
      bishop: 0,
      queen: 0,
      pawn: 0,
    },
  })

  // promotionMenu is responsible for showing a list of chess pieces pawn can promote to.
  const [promotionMenu, setPromotionMenu] = useState({
    blackPieces: false,
    whitePieces: false,
    cellWhereToPopup: '',
  });

  const [isWinner, setIsWinner] = useState({
    // isWinner: false,
    // winnerColor: NaN,
    isWinner: false,
    winnerColor: '',
  });

  const [chessNotation, setChessNotation] = useState([
      // white move, black move
  ])
  const notationSettingsRef = useRef({});

  let currTurn = useRef(0);


  // update kingsState useEffect
  useEffect(() => {
    function updateKingsState(whiteColorKingState, blackColorKingState) {
      setKingsState({
        ...kingsState,
        white: whiteColorKingState,
        black: blackColorKingState
      });
    }

    function updateNotationSettingsRef() {
      if (whiteColorKingState === 'checked' || blackColorKingState === 'checked') {
        notationSettingsRef.current.didCheck = true;
      }
    }

    const whiteKingPos = kingsPos['white'];
    const blackKingPos = kingsPos['black'];
    const whiteColorKingState = allPiecesLogic.king.white.isCheckedOrMated(whiteKingPos, boardPlacement);
    const blackColorKingState = allPiecesLogic.king.black.isCheckedOrMated(blackKingPos, boardPlacement);

    updateKingsState(whiteColorKingState, blackColorKingState);
    updateNotationSettingsRef();
  }, [boardPlacement, kingsPos])
  


  // setting chess notation
  useEffect(() => {
    // checking if notationSettingsRef.current object is empty
    if ( !((Object.keys(notationSettingsRef.current).length === 0) && (notationSettingsRef.current.constructor === Object)) ) {
      // updating chess notation with didCheck, didMate
      setChessNotation([
        ...chessNotation,
        chessNotationLogic(notationSettingsRef.current),
      ]);
      notationSettingsRef.current = {};
    }
  }, [boardPlacement, chessNotation, kingsState])

  //is mated useEffect
  useEffect(() => {
    if (kingsState.white === 'mated') {
      setIsWinner({
        ...isWinner,
        isWinner: true,
        winnerColor: 'black',
      })
    } else if (kingsState.black === 'mated') {
      setIsWinner({
        ...isWinner,
        isWinner: true,
        winnerColor: 'white',
      })
    }
  }, [kingsState]);

  function touchPieceHandler(cellNumb) {
    const piece = boardPlacement[cellNumb][0];
    const pieceColor = boardPlacement[cellNumb][1];
    // checking sequence of moves.
    if (currTurn.current % 2 === 0) {
      // white turn
      if (pieceColor === 'black') {
        //turn isn't black
        return
      }
    } else if (pieceColor === 'white') {
        //turn isn't white
      return
    }
    
    // allPossibleTurns = {moves: Array(n), captures: Array(n)}, where n - is number of possibles
    const allPossibleTurns = allPiecesLogic[piece][pieceColor].getPossiblesMovesSells(cellNumb, boardPlacement);
    console.log(`${pieceColor} ${piece} touched`);

    setActivePiece({
      ...activePiece,
      piece: [piece, pieceColor],
      pieceInitPos: cellNumb,
      moves: allPossibleTurns.moves,
      captures: allPossibleTurns.captures,
    })

    notationSettingsRef.current.prevPos = cellNumb;
  }

  function moveHandler(cellNumb) {
    const piece = activePiece.piece[0];
    const pieceColor = activePiece.piece[1];
    console.log(`${pieceColor} ${piece} moved to ${cellNumb}`);

    // if it's a pawn turn check for a promotion
    if (piece === 'pawn') {
      if (isTopRow(cellNumb)) {
        setPromotionMenu({
          ...promotionMenu,
          whitePieces: true,
          cellWhereToPopup: cellNumb,
        })
        notationSettingsRef.current.isPromoted = true;
      } else if (isBottomRow(cellNumb)) {
        setPromotionMenu({
          ...promotionMenu,
          blackPieces: true,
          cellWhereToPopup: cellNumb,
        })
        notationSettingsRef.current.isPromoted = true;
      }
    } 
    else if (piece === 'king') {
      setKingsPos({
        ...kingsPos,
        [pieceColor]: cellNumb,
      })
    }

    // update board Placement
    setBoardPlacement({
      ...boardPlacement,
      [activePiece.pieceInitPos]: undefined,
      [cellNumb]: activePiece.piece,
    })
    setActivePiece({
      ...activePiece,
      piece: [],
      pieceInitPos: '',
      moves: [],
      captures: [],
    })

    currTurn.current += 1;

    notationSettingsRef.current.piece = piece;
    notationSettingsRef.current.nextPos = cellNumb;
    };

  

  function captureHandler(cellNumb) {
    console.log(`${boardPlacement[cellNumb][1]} ${boardPlacement[cellNumb][0]} is taken`);
    moveHandler(cellNumb);
    const takenPiece = boardPlacement[cellNumb][0];
    const takenPieceColor = boardPlacement[cellNumb][1];
    const prevValueTakenPieces = takenPieces[takenPieceColor][takenPiece];
    const otherPieceColor = (takenPieceColor === 'white' ? 'black' : 'white');
    setTakenPieces({
      ...takenPieces,
      [takenPieceColor]: {
        ...takenPieces[takenPieceColor],
        [takenPiece]: prevValueTakenPieces + 1,
      },
      [otherPieceColor]: {
        ...takenPieces[otherPieceColor],
      },
    })
    notationSettingsRef.current.didCapture = true;
  }

  function promotePawn(chosenPiece, color) {
    setBoardPlacement({
      ...boardPlacement,
      [promotionMenu.cellWhereToPopup]: [chosenPiece, color]
    })

    setPromotionMenu({
      ...promotionMenu,
      blackPieces: false,
      whitePieces: false,
      cellWhereToPopup: '',
    })
  }

  function playAgain() {
    setBoardPlacement({
      0: ['rook', 'black',],
      1: ['knight', 'black'],
      2: ['bishop', 'black'],
      3: ['queen', 'black'],
      4: ['king', 'black'],
      5: ['bishop', 'black'],
      6: ['knight', 'black'],
      7: ['rook', 'black'],
      8: ['pawn', 'black'],
      9: ['pawn', 'black'],
      10: ['pawn', 'black'],
      11: ['pawn', 'black'],
      12: ['pawn', 'black'],
      13: ['pawn', 'black'],
      14: ['pawn', 'black'],
      15: ['pawn', 'black'],
  
      48: ['pawn', 'white'],
      49: ['pawn', 'white'],
      50: ['pawn', 'white'],
      51: ['pawn', 'white'],
      52: ['pawn', 'white'],
      53: ['pawn', 'white'],
      54: ['pawn', 'white'],
      55: ['pawn', 'white'],
      56: ['rook', 'white'],
      57: ['knight', 'white'],
      58: ['bishop', 'white'],
      59: ['queen', 'white'],
      60: ['king', 'white'],
      61: ['bishop', 'white'],
      62: ['knight', 'white'],
      63: ['rook', 'white'],
    })
    setIsWinner({
      isWinner: false,
      winnerColor: NaN,
    });
    currTurn.current = 0;
    setChessNotation([]);
    notationSettingsRef.current = [];
    setTakenPieces({
      white: {
        rook: 0,
        knight: 0,
        bishop: 0,
        queen: 0,
        pawn: 0,
      },
      black: {
        rook: 0,
        knight: 0,
        bishop: 0,
        queen: 0,
        pawn: 0,
      },
    })
  }

  return (
    <>
      <ChessNotation movesArr={chessNotation} />
      {promotionMenu.whitePieces ? (
        <PromotionMenu
          piecesColor='white'
          cell={promotionMenu.cellWhereToPopup}
          onPromotionPieceClick={promotePawn}
        />
      ) : (
        <div style={{height: 97}}></div>
      )}
      <section className="chess-board">
        {Array.from(Array(64).keys()).map(iCell => (
          <Cell
            key={iCell}
            cellId={iCell}
            color={Math.floor(iCell / 8) % 2 === 0
              ? iCell % 2 === 0 ? 'white' : 'black'
              : iCell % 2 === 0 ? 'black' : 'white'
            }
            isTheLeftColumn={iCell % 8 === 0 ? true : false}
            isTheBottomRow={iCell >= 56 ? true : false}
            rowNumb={8 - Math.floor(iCell / 8)}
            columnLetter={letterArr[iCell % 8]}
            cellPiece={Array.isArray(boardPlacement[iCell])
              ? boardPlacement[iCell]
              : null
            }
            kingsState={kingsState}
            isMovePossible={activePiece.moves.includes(iCell)
              ? true
              : false
            }
            isCapturePossible={activePiece.captures.includes(iCell)
              ? true
              : false
            }
            onPieceClick={touchPieceHandler}
            onPieceMove={moveHandler}
            onPieceCapture={captureHandler}
          />
        ))}
      </section>
      {promotionMenu.blackPieces ? (
        <PromotionMenu
          piecesColor='black'
          cell={promotionMenu.cellWhereToPopup}
          onPromotionPieceClick={promotePawn}
        />
      ) : (
        <div style={{height: 97}}></div>
      )}
      <TakenPieces
        takenPieces={takenPieces}
      />
      {isWinner.isWinner && (
        <WinnerPopup
          winnerColor={isWinner.winnerColor}
          onPlayAgain={playAgain}
        />
      )}
    </>
  )
}