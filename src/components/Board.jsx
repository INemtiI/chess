import { Chess } from 'chess.js';
import Square from './Square';
import './Board.css';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

function Board({ position, onSquareClick, selectedSquare, legalMoves, lastMove, flipped, inCheck, turn }) {
  const game = new Chess(position);

  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  const getKingSquare = () => {
    if (!inCheck) return null;
    const board = game.board();
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = board[rank][file];
        if (piece && piece.type === 'k' && piece.color === turn) {
          return files[file] + (8 - rank);
        }
      }
    }
    return null;
  };

  const kingSquare = getKingSquare();

  return (
    <div className="board-container">
      <div className="board-wrapper">
        <div className="board-frame">
          {/* Top file labels */}
          <div className="board-labels board-labels-top">
            {displayFiles.map(file => (
              <div key={file} className="board-label">{file}</div>
            ))}
          </div>

          {/* Left rank labels */}
          <div className="board-labels board-labels-left">
            {displayRanks.map(rank => (
              <div key={rank} className="board-label">{rank}</div>
            ))}
          </div>

          {/* Chess board */}
          <div className="board">
            {displayRanks.map((rank, rankIndex) => (
              displayFiles.map((file, fileIndex) => {
                const square = file + rank;
                const piece = game.get(square);
                const isLight = (rankIndex + fileIndex) % 2 === 0;
                const isSelected = selectedSquare === square;
                const isLegalMove = legalMoves.includes(square);
                const isLastMove = lastMove && (lastMove.from === square || lastMove.to === square);
                const isKingInCheck = kingSquare === square;

                return (
                  <Square
                    key={square}
                    square={square}
                    piece={piece}
                    isLight={isLight}
                    isSelected={isSelected}
                    isLegalMove={isLegalMove}
                    isLastMove={isLastMove}
                    isKingInCheck={isKingInCheck}
                    onClick={() => onSquareClick(square)}
                  />
                );
              })
            ))}
          </div>

          {/* Right rank labels */}
          <div className="board-labels board-labels-right">
            {displayRanks.map(rank => (
              <div key={rank} className="board-label">{rank}</div>
            ))}
          </div>

          {/* Bottom file labels */}
          <div className="board-labels board-labels-bottom">
            {displayFiles.map(file => (
              <div key={file} className="board-label">{file}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
