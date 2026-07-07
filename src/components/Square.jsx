import Piece from './Piece';
import './Square.css';

function Square({
  square,
  piece,
  isLight,
  isSelected,
  isLegalMove,
  isLastMove,
  isKingInCheck,
  onClick
}) {
  return (
    <div
      className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isLastMove ? 'last-move' : ''} ${isKingInCheck ? 'king-check' : ''}`}
      onClick={onClick}
    >
      {piece && <Piece type={piece.type} color={piece.color} />}
      {isLegalMove && (
        <div className={`legal-move-indicator ${piece ? 'capture' : 'empty'}`}></div>
      )}
    </div>
  );
}

export default Square;
