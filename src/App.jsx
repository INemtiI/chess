import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import Board from './components/Board';
import Controls from './components/Controls';
import MoveHistory from './components/MoveHistory';
import CapturedPieces from './components/CapturedPieces';
import MaterialBalance from './components/MaterialBalance';
import ChessClock from './components/ChessClock';
import LastMoveCard from './components/LastMoveCard';
import ThemeToggle from './components/ThemeToggle';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

function App() {
  const [game] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [flipped, setFlipped] = useState(false);
  const [autoFlip, setAutoFlip] = useState(false);
  const [gameOver, setGameOver] = useState(null);
  const [moveFlash, setMoveFlash] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && !html.classList.contains('dark')) {
      html.classList.add('dark');
    }
  }, []);

  const makeMove = (from, to) => {
    try {
      const moveData = game.move({ from, to, promotion: 'q' });
      if (moveData) {
        setPosition(game.fen());
        setLastMove({ from, to });
        setMoveHistory([...moveHistory, moveData.san]);

        // Световой импульс после хода
        setMoveFlash(true);
        setTimeout(() => setMoveFlash(false), 300);

        if (moveData.captured) {
          const color = moveData.color === 'w' ? 'white' : 'black';
          setCapturedPieces({
            ...capturedPieces,
            [color]: [...capturedPieces[color], moveData.captured]
          });
        }

        if (game.isCheckmate()) {
          setGameOver({ type: 'checkmate', winner: moveData.color === 'w' ? 'Белые' : 'Чёрные' });
        } else if (game.isStalemate()) {
          setGameOver({ type: 'stalemate' });
        } else if (game.isDraw()) {
          setGameOver({ type: 'draw' });
        }

        // Автоматический поворот доски после хода
        if (autoFlip) {
          setFlipped(prev => !prev);
        }

        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  const handleSquareClick = (square) => {
    if (gameOver) return;

    if (selectedSquare) {
      const moved = makeMove(selectedSquare, square);
      setSelectedSquare(null);
      setLegalMoves([]);
      if (!moved && game.get(square)) {
        const moves = game.moves({ square, verbose: true });
        if (moves.length > 0) {
          setSelectedSquare(square);
          setLegalMoves(moves.map(m => m.to));
        }
      }
    } else {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        const moves = game.moves({ square, verbose: true });
        setSelectedSquare(square);
        setLegalMoves(moves.map(m => m.to));
      }
    }
  };

  const handleNewGame = () => {
    game.reset();
    setPosition(game.fen());
    setSelectedSquare(null);
    setLegalMoves([]);
    setLastMove(null);
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    setGameOver(null);
  };

  const handleUndo = () => {
    if (game.history().length > 0) {
      game.undo();
      setPosition(game.fen());
      setSelectedSquare(null);
      setLegalMoves([]);
      const history = game.history();
      setMoveHistory([...history]);

      const tempGame = new Chess();
      const captured = { white: [], black: [] };
      history.forEach(move => {
        const moveData = tempGame.move(move);
        if (moveData.captured) {
          const color = moveData.color === 'w' ? 'white' : 'black';
          captured[color].push(moveData.captured);
        }
      });
      setCapturedPieces(captured);
      setGameOver(null);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleToggleAutoFlip = () => {
    setAutoFlip(!autoFlip);
  };

  return (
    <div className={`app-container ${moveFlash ? 'move-flash' : ''}`}>
      <AnimatedBackground
        turn={game.turn()}
        inCheck={game.inCheck()}
        lastMove={lastMove}
        capturedPieces={capturedPieces}
      />
      <ThemeToggle />

      <div className="content-wrapper">
        <header className="header">
          <h1 className="title">ЭНДШПИЛЬ</h1>
        </header>

        <div className="game-layout">
          <div className="board-section">
            <Board
              position={position}
              onSquareClick={handleSquareClick}
              selectedSquare={selectedSquare}
              legalMoves={legalMoves}
              lastMove={lastMove}
              flipped={flipped}
              inCheck={game.inCheck()}
              turn={game.turn()}
            />
            <LastMoveCard lastMove={lastMove} moveHistory={moveHistory} />
          </div>

          <div className="side-panel">
            <div className="turn-indicator">
              <ChessClock turn={game.turn()} isGameOver={gameOver !== null} />
              <div className={`turn-token ${game.turn() === 'w' ? 'white-turn' : 'black-turn'}`}>
                <span className="turn-label">Ход: {game.turn() === 'w' ? 'Белые' : 'Чёрные'}</span>
              </div>
            </div>

            <MaterialBalance capturedPieces={capturedPieces} />
            <CapturedPieces captured={capturedPieces} />
            <MoveHistory moves={moveHistory} />
            <Controls
              onNewGame={handleNewGame}
              onUndo={handleUndo}
              onFlip={handleFlip}
              onToggleAutoFlip={handleToggleAutoFlip}
              autoFlip={autoFlip}
              canUndo={game.history().length > 0}
            />
          </div>
        </div>
      </div>

      {gameOver && (
        <div className="game-over-overlay" onClick={() => setGameOver(null)}>
          <div className="game-over-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="game-over-title">
              {gameOver.type === 'checkmate' && `Мат! Победили ${gameOver.winner}`}
              {gameOver.type === 'stalemate' && 'Пат!'}
              {gameOver.type === 'draw' && 'Ничья!'}
            </h2>
            <button className="new-game-btn" onClick={handleNewGame}>
              Новая игра
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
