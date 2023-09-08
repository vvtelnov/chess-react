import { useRef } from 'react';

export default function ChessNotation(props) {
  const notationListRef = useRef(null);

  function calcNotationNumb(numb) {
    if (numb < 2) {
      return numb;
    } else {
      return Math.floor(numb / 2);
    }
  }

  function scrollToTheEnd() {
    const notationListNode = notationListRef.current;
    if (notationListNode) {
      notationListNode.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'end',
      });
    }
  }

  return (
    <ul className="chess-notation">
      {props.movesArr.map((iMove, index, arr) => (
        (index % 2 === 0 && (
          <li className="chess-notation__item" key={index}>
            <span className="chess-notation__counter">{`${calcNotationNumb(index + 2)}.`}</span>
            <div className="chess-notation__note chess-notation__note_move_white" ref={notationListRef}>{iMove}</div>
            {arr[index + 1] && (
              <div className="chess-notation__note chess-notation__note_move_black" ref={notationListRef}>
                {arr[index + 1]}
              </div>
            )}
          </li>
        ))
      ))}
      {scrollToTheEnd()}
    </ul>
  )
}