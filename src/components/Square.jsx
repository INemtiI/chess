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
  onClick,
  showFile,
  showRank,
  file,
  rank
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
      {showFile && <div className="coord coord-file">{file}</div>}
      {showRank && <div className="coord coord-rank">{rank}</div>}
    </div>
  );
}

export default Square;
