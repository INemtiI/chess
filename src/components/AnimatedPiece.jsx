import { useState, useEffect } from 'react';
import Piece from './Piece';
import './AnimatedPiece.css';

function AnimatedPiece({ type, color, fromSquare, toSquare, onAnimationEnd, isCapture }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (fromSquare && toSquare) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }, isCapture ? 300 : 250);

      return () => clearTimeout(timeout);
    }
  }, [fromSquare, toSquare, onAnimationEnd, isCapture]);

  const getSquarePosition = (square) => {
    if (!square) return { x: 0, y: 0 };
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = 8 - parseInt(square[1]);
    return { x: file * 70, y: rank * 70 };
  };

  const from = getSquarePosition(fromSquare);
  const to = getSquarePosition(toSquare);

  const style = isAnimating ? {
    transform: `translate(${to.x - from.x}px, ${to.y - from.y}px)`,
    transition: `transform ${isCapture ? 300 : 250}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    zIndex: 10
  } : {};

  return (
    <div className={`animated-piece ${isCapture ? 'capture-animation' : ''}`} style={style}>
      <Piece type={type} color={color} />
    </div>
  );
}

export default AnimatedPiece;
