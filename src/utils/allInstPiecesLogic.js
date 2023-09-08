import Rook from './piecesPossibleMoves/Rook';
import Knight from './piecesPossibleMoves/Knight';
import Bishop from './piecesPossibleMoves/Bishop';
import Queen from './piecesPossibleMoves/Queen';
import King from './piecesPossibleMoves/King';
import Pawn from './piecesPossibleMoves/Pawn';

// object of all chess pieces.
const allPieces = {
	rook: {
		black: new Rook('black', 'rook'),
		white: new Rook('white', 'rook'),
	},
	knight: {
		black: new Knight('black', 'knight'),
		white: new Knight('white', 'knight'),
	},
	bishop: {
		black: new Bishop('black', 'bishop'),
		white: new Bishop('white', 'bishop'),
	},
	queen: {
		black: new Queen('black', 'queen'),
		white: new Queen('white', 'queen'),
	},
	king: {
		black: new King('black', 'king'),
		white: new King('white', 'king'),
	},
	pawn: {
		black: new Pawn('black', 'pawn'),
		white: new Pawn('white', 'pawn'),
	},
}

export default allPieces;